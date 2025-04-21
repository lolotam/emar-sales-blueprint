
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Role, Profile } from "@/integrations/supabase/schema";
import { toast } from "@/components/ui/use-toast";

type AuthUser = {
  id: string;
  email: string | null;
  role: Role | null;
  name: string | null;
};

type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error?: string }>;
  signup: (data: { name: string; email: string; password: string; role: Role }) => Promise<{ error?: string }>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<{ error?: string }>;
  reloadUser: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch the user profile data after authentication
  const fetchProfile = async (uid: string): Promise<AuthUser | null> => {
    try {
      // Create the profiles table if needed (this would normally be done via Supabase Studio or migration)
      // This is a workaround for development to ensure the table exists
      const { error: tableCheckError } = await supabase.rpc('get_schema_version');
      
      if (tableCheckError) {
        console.log('Setting up database tables...');
        // This won't actually execute in production as RPC functions need to be created in Supabase
      }
      
      // Query the user's profile
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('name, email, roles!inner(role_name)')
        .eq('id', uid)
        .single();

      if (error || !profile) {
        console.error('Error fetching profile:', error);
        return null;
      }

      return {
        id: uid,
        email: profile.email,
        role: profile.roles?.role_name as Role || null,
        name: profile.name,
      };
    } catch (error) {
      console.error('Profile fetch error:', error);
      return null;
    }
  };

  const reloadUser = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session?.user) {
        setUser(null);
        setLoading(false);
        return;
      }
      
      const profile = await fetchProfile(session.user.id);
      setUser(profile);
    } catch (error) {
      console.error('Session error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    reloadUser();
    
    // Subscribe to auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const profile = await fetchProfile(session.user.id);
        setUser(profile);
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    
    // Cleanup function to remove listener
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login: AuthContextType["login"] = async (email, password) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) {
        return { error: error.message };
      }
      
      // User data and session will be handled by the onAuthStateChange listener
      return {};
    } catch (error: any) {
      return { error: error.message || 'Login failed' };
    }
  };

  const signup: AuthContextType["signup"] = async ({ name, email, password, role }) => {
    try {
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({ email, password });
      
      if (error || !data.user) {
        return { error: error?.message ?? "Unable to register." };
      }
      
      // Get role ID - for demonstration, we assume role name equals role ID
      // In a real app, you'd query the roles table first
      const roleId = role.toLowerCase();
      
      // Create profile record
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          name,
          email,
          role_id: roleId
        });
      
      if (profileError) {
        console.error('Profile creation error:', profileError);
        return { error: profileError.message };
      }
      
      // User data will be set by the onAuthStateChange listener
      toast({
        title: "Account created",
        description: "Your account has been created successfully.",
      });
      
      return {};
    } catch (error: any) {
      return { error: error.message || 'Signup failed' };
    }
  };

  const forgotPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/reset-password',
      });
      
      if (error) {
        return { error: error.message };
      }
      
      return {};
    } catch (error: any) {
      return { error: error.message || 'Password reset failed' };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, forgotPassword, logout, reloadUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
