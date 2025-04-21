
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b flex items-center justify-between px-6 py-3 shadow-sm">
      <Link to="/" className="font-bold text-lg">Emar Sales Point</Link>
      <div className="flex gap-4 items-center">
        {!loading && user ?
          <>
            <span className="text-sm text-gray-700">
              Role:
              <span className="ml-1 px-2 py-1 rounded bg-gray-100 text-gray-800 font-medium">{user.role || "Unknown"}</span>
            </span>
            <Button onClick={handleLogout} variant="outline">Logout</Button>
          </>
          :
          <>
            <Link to="/login"><Button variant="ghost">Login</Button></Link>
            <Link to="/signup"><Button>Sign Up</Button></Link>
          </>
        }
      </div>
    </nav>
  );
}
