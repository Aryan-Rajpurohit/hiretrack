import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
    const {user, logout} = useAuth()
    // const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
            <h1 className="text-white text-xl font-bold">Hire<span className="text-blue-500">Track</span></h1>
            <div className="flex items-center gap-4">
                <span className="text-gray-400 text-sm">
                    👋 Hey, {user?.name}
                </span>
                <button
                className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-xl transition"
                onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </nav>
    )
}