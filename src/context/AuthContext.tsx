import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { api } from "../lib/api";

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (email: string, password: string) => Promise<boolean>;
    register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    const login = async (email: string, password: string) => {
        try {
            const res = await api.post("/auth/login", { email, password });
            setUser(res.data.user);
            setToken(res.data.token);
            return true;
        } catch {
            return false;
        }
    };

    const register = async (name: string, email: string, password: string) => {
        try {
            const res = await api.post("/auth/register", { name, email, password });
            setUser(res.data.user);
            setToken(res.data.token);
            return true;
        } catch {
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
