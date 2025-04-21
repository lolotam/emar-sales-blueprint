
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await forgotPassword(email);
    setLoading(false);
    if (error) toast({ title: "Reset Error", description: error, variant: "destructive" });
    else toast({ title: "Reset Email Sent!", description: "Check your inbox." });
  };

  return (
    <form className="space-y-4 max-w-md mx-auto" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-2">Forgot Password</h2>
      <Input placeholder="Your email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <Button type="submit" disabled={loading} className="w-full">{loading ? "Sending..." : "Send reset link"}</Button>
    </form>
  );
}
