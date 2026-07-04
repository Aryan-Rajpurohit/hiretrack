import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
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
    if (!form.name.trim() || !form.email.trim() || !form.password.trim()) {
      setError("All fields are required");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Please enter a valid email");
      return;
    }
    setLoading(true);
    try {
      const res = await API.post("/auth/register", form);
      login(res.data.token, res.data.name);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
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
          <p className="text-blue-400 text-sm mb-4 font-medium">START FOR FREE TODAY</p>
          <h2 className="text-white text-4xl font-semibold leading-snug mb-6">
            Your job search,<br />finally organized.
          </h2>
          <p className="text-gray-400 text-base leading-relaxed mb-10">
            Join job seekers who use HireTrack to manage their applications,
            track interviews, and land offers faster.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { num: "100%", label: "Free forever" },
              { num: "5", label: "Pipeline stages" },
              { num: "6+", label: "Portals supported" },
              { num: "∞", label: "Applications tracked" },
            ].map((s) => (
              <div key={s.label} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                <p className="text-blue-400 text-2xl font-semibold">{s.num}</p>
                <p className="text-gray-500 text-xs mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom note */}
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-400"></div>
          <p className="text-gray-500 text-sm">
            Free to use · No credit card required · Takes 30 seconds to set up
          </p>
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
            Create your account 🚀
          </h2>
          <p className="text-gray-400 mb-8">
            Free forever. Start tracking in 30 seconds.
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl mb-5 text-sm">
              {error}
            </div>
          )}

          <div className="flex flex-col gap-4">
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Aryan Rajpurohit"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-gray-900 border border-gray-700 focus:border-blue-500 text-white px-4 py-3 rounded-xl outline-none transition text-sm"
              />
            </div>
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
                placeholder="Min. 6 characters"
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
              {loading ? "Creating account..." : "Create free account"}
            </button>
          </div>

          <p className="text-gray-500 text-sm text-center mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 transition">
              Login here
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