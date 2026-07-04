import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.email.trim() || !form.password.trim()) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex">

      {/* Left Side — Branding */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gray-900 border-r border-gray-800 p-12">
        {/* Logo */}
        <div>
          <h1 className="text-white text-2xl font-semibold">
            Hire<span className="text-blue-500">Track</span>
          </h1>
        </div>

        {/* Center Content */}
        <div>
          <p className="text-blue-400 text-sm mb-4 font-medium">YOUR JOB SEARCH COMPANION</p>
          <h2 className="text-white text-4xl font-semibold leading-snug mb-6">
            Stay on top of<br />every application.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Track every job you apply to, move them through your pipeline,
            and see exactly where you stand — all in one place.
          </p>

          {/* Feature bullets */}
          <div className="flex flex-col gap-4">
            {[
              { icon: "📋", text: "Kanban board to visualize your pipeline" },
              { icon: "📊", text: "Analytics to track response rates" },
              { icon: "🌐", text: "Works with LinkedIn, Naukri, Indeed & more" },
            ].map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-base shrink-0">
                  {f.icon}
                </div>
                <p className="text-gray-400 text-sm">{f.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div className="bg-gray-800 rounded-2xl p-5 border border-gray-700">
          <p className="text-gray-300 text-sm leading-relaxed mb-3">
            "I was applying to 20+ companies and had no idea which stage I was at. HireTrack changed that completely."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-medium">
              A
            </div>
            <div>
              <p className="text-white text-xs font-medium">Aryan R.</p>
              <p className="text-gray-500 text-xs">BSc IT Graduate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side — Form */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">

        {/* Mobile logo */}
        <div className="lg:hidden mb-8">
          <h1 className="text-white text-2xl font-semibold text-center">
            Hire<span className="text-blue-500">Track</span>
          </h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-white text-3xl font-semibold mb-2">
            Welcome back 👋
          </h2>
          <p className="text-gray-400 mb-8">
            Login to continue tracking your applications
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 text-white px-4 py-3 rounded-xl outline-none transition text-sm"
              />
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Password</label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 text-white px-4 py-3 rounded-xl outline-none transition text-sm"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition mt-1"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-400 hover:text-blue-300 transition">
              Create one free
            </Link>
          </p>

          <p className="text-center mt-8">
            <Link to="/" className="text-gray-600 hover:text-gray-400 text-xs transition">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>

    </div>
  );
}