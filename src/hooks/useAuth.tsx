
import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";

type Role = "Admin" | "Salesman" | "Accountant" | "Warehouse";
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

  const fetchProfile = async (uid: string) => {
    const { data: profile, error } = await supabase
      .from("profiles")
      .select("name, email, role_id, roles (role_name)")
      .eq("id", uid)
      .single();
    if (!profile || error) return null;
    return {
      id: uid,
      email: profile.email,
      role: profile.roles?.role_name ?? null,
      name: profile.name,
    } as AuthUser;
  };

  const reloadUser = async () => {
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) {
      setUser(null);
      setLoading(false);
      return;
    }
    const profile = await fetchProfile(session.user.id);
    setUser(profile);
    setLoading(false);
  };

  useEffect(() => {
    reloadUser();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, _session) => {
      reloadUser();
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const login: AuthContextType["login"] = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return { error: error.message };
    await reloadUser();
    return {};
  };

  const signup: AuthContextType["signup"] = async ({ name, email, password, role }) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error || !data.user) return { error: error?.message ?? "Unable to register." };
    // Insert into profiles table
    const { error: profileError } = await supabase.from("profiles").insert({
      id: data.user.id,
      name,
      email,
      role_id: await roleIdByName(role)
    });
    if (profileError) return { error: profileError.message };
    await reloadUser();
    return {};
  };

  const forgotPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/reset-password', // You can add this page later for full flow
    });
    if (error) return { error: error.message };
    return {};
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  // Helper: get role_id from role name
  const roleIdByName = async (role: Role) => {
    const { data, error } = await supabase.from("roles").select("id").eq("role_name", role).single();
    if (error || !data) throw new Error("Role not found");
    return data.id;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, forgotPassword, logout, reloadUser }}>
      {children}
    </AuthContext.Provider>
  )
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
