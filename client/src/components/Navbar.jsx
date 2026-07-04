import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const initials = user?.name
    ? user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-10"
      style={{ background: "rgba(255,255,255,0.02)" }}>
      <h1 className="text-white text-xl font-semibold">
        Hire<span className="text-blue-500">Track</span>
      </h1>
      <div className="flex items-center gap-3">
        <span className="text-gray-400 text-sm hidden sm:block">
          Hey, {user?.name} 👋
        </span>
        <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
          {initials}
        </div>
        <button
          onClick={handleLogout}
          className="text-red-400 hover:text-red-300 text-sm px-4 py-1.5 rounded-lg border border-red-500/20 hover:border-red-500/30 transition"
          style={{ background: "rgba(239,68,68,0.06)" }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}