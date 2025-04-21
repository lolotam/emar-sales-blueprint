
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const roles = [
  { label: "Admin", value: "Admin" },
  { label: "Salesman", value: "Salesman" },
  { label: "Accountant", value: "Accountant" },
  { label: "Warehouse", value: "Warehouse" },
];

export default function SignupForm() {
  const { signup } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "Salesman" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signup(form as any);
    setLoading(false);
    if (error) toast({ title: "Sign up error", description: error, variant: "destructive" });
    else toast({ title: "Welcome!", description: "Registration complete.", variant: "default" });
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Sign Up</h2>
      <Input placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
      <Input placeholder="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
      <Input placeholder="Password" name="password" type="password" value={form.password} onChange={handleChange} required />
      <select name="role" value={form.role} onChange={handleChange} className="w-full rounded-md border p-2 text-sm">
        {roles.map(r =>
          <option value={r.value} key={r.value}>{r.label}</option>
        )}
      </select>
      <Button type="submit" disabled={loading} className="w-full">{loading ? "Registering..." : "Sign Up"}</Button>
    </form>
  );
}
