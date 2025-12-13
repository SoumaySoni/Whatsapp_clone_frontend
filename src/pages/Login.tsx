import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await login(email, password);

        if (!success) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Login to WhatsApp Clone
                </h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 duration-200"
                >
                    Login
                </button>

                <p className="text-center text-sm">
                    Don't have an account?{" "}
                    <a href="/register" className="text-blue-600 hover:underline">
                        Register
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Login;
