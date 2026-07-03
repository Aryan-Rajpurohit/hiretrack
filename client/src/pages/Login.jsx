import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import API from "../api/axios"

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" })
    const [error, setError] = useState("")
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.email.trim() || !form.password.trim()) {
            setError("All fields are required");
            return;
        }

        try {
            const res = await API.post("/auth/login", form);
            login(res.data.token, res.data.name);
            navigate("/dashboard");
        } catch (err) {
            setError(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md">
                <h2 className="text-white text-3xl font-bold mb-2">Welcome back 👋</h2>
                <p className="text-gray-400 mb-6">Login to your Hiretrack account</p>

                {error && (
                    <div className="bg-red-500/20 text-red-400 px-4 py-2 rounded-lg mb-4">
                        {error}
                    </div>
                )}

                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        value={form.email}
                        onChange={handleChange}
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-blue-500" />
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        value={form.password}
                        onChange={handleChange}
                        className="bg-gray-800 text-white px-4 py-3 rounded-xl outline-none focus:ring-blue-500" />
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition">Login</button>
                </div>
                <p className="text-gray-400 text-center mt-6">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-blue-400 hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    )

}