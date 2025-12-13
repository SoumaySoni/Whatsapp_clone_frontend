import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
    const { register } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        const success = await register(name, email, password);
        if (success) {
            window.location.href = "/chat";
        } else {
            setError("Could not register. Try another email.");
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleRegister}
                className="bg-white p-8 rounded-lg shadow-md w-96 space-y-4"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Create Account
                </h2>

                {error && <p className="text-red-500 text-sm">{error}</p>}

                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        className="w-full mt-1 border rounded px-3 py-2 outline-none focus:ring"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 duration-200"
                >
                    Register
                </button>

                <p className="text-center text-sm">
                    Already have an account?{" "}
                    <a href="/login" className="text-green-600 hover:underline">
                        Login
                    </a>
                </p>
            </form>
        </div>
    );
};

export default Register;
