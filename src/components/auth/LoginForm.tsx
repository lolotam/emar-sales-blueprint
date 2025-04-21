
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function LoginForm() {
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [emailNotConfirmed, setEmailNotConfirmed] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Reset the email confirmation error when user types
    if (e.target.name === "email" || e.target.name === "password") {
      setEmailNotConfirmed(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await login(form.email, form.password);
    setLoading(false);
    
    if (error) {
      // Check specifically for email confirmation error
      if (error.includes("Email not confirmed")) {
        setEmailNotConfirmed(true);
      } else {
        toast({ title: "Login error", description: error, variant: "destructive" });
      }
    } else {
      toast({ title: "Login successful!", variant: "default" });
      // Redirect based on role
      if (user?.role === "Admin") navigate("/dashboard/admin");
      else if (user?.role === "Salesman") navigate("/dashboard/salesman");
      else if (user?.role === "Accountant") navigate("/dashboard/accountant");
      else if (user?.role === "Warehouse") navigate("/dashboard/warehouse");
      else navigate("/");
    }
  };

  const resendConfirmationEmail = async () => {
    try {
      const { error } = await login(form.email, form.password);
      if (!error) {
        toast({
          title: "Success",
          description: "If your account exists, a new confirmation email has been sent.",
          variant: "default"
        });
      } else {
        toast({
          title: "Error",
          description: "Please check your email and password and try again.",
          variant: "destructive"
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Something went wrong, please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      
      {emailNotConfirmed && (
        <Alert className="bg-amber-50 border-amber-300">
          <InfoIcon className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Your email has not been confirmed yet. Please check your email for a confirmation link.
            <Button 
              variant="link" 
              className="p-0 h-auto text-amber-700 font-semibold underline ml-1"
              onClick={resendConfirmationEmail}
              type="button"
            >
              Resend confirmation email
            </Button>
          </AlertDescription>
        </Alert>
      )}
      
      <Input placeholder="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      <Input placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
      <Button type="submit" disabled={loading} className="w-full">{loading ? "Logging in..." : "Login"}</Button>
    </form>
  );
}
