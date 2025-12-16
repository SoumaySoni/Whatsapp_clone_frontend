import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { api } from "../lib/api";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthResponse {
  success: boolean;
  user: User | null;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<AuthResponse>;
  register: (name: string, email: string, password: string) => Promise<AuthResponse>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [loadingAuth, setLoadingAuth] = useState(true);

    // Load saved token + user on first load
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(JSON.parse(savedUser));
        }

        setLoadingAuth(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post("/auth/login", { email, password });

            setUser(res.data.user);
            setToken(res.data.token);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            return { success: true, user: res.data.user };
        } catch {
            return { success: false, user: null };
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await api.post("/auth/register", { name, email, password });

            setUser(res.data.user);
            setToken(res.data.token);

            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            return { success: true, user: res.data.user };
        } catch {
            return { success: false, user: null };
        }
    };

    if (loadingAuth) return null; // or a loader

    return (
        <AuthContext.Provider value={{ user, token, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
