
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { login, user } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await login(form.email, form.password);
    setLoading(false);
    if (error) toast({ title: "Login error", description: error, variant: "destructive" });
    else {
      toast({ title: "Login successful!", variant: "default" });
      // Redirect based on role
      if (user?.role === "Admin") navigate("/dashboard/admin");
      else if (user?.role === "Salesman") navigate("/dashboard/salesman");
      else if (user?.role === "Accountant") navigate("/dashboard/accountant");
      else if (user?.role === "Warehouse") navigate("/dashboard/warehouse");
      else navigate("/");
    }
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Login</h2>
      <Input placeholder="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      <Input placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
      <Button type="submit" disabled={loading} className="w-full">{loading ? "Logging in..." : "Login"}</Button>
    </form>
  );
}
