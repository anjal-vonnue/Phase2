import { createContext, useContext, useEffect, useState } from "react";
import { loginApi } from "../api/login";
import { registerApi } from "../api/register";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
    role: string,
  ) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("project-user");
    const savedToken = localStorage.getItem("project-token");

    if (savedUser && savedToken) {
      setToken(savedToken);
      setUser(JSON.parse(savedUser));
    }

    setIsLoading(false);
  }, []);

  async function login(email: string, password: string) {
    const data = await loginApi(email, password);

    console.log("inside auth context 1");

    localStorage.setItem("project-user", JSON.stringify(data.user));
    localStorage.setItem("project-token", data.token);

    console.log("inside auth context 2");
    console.log(data);

    setUser(data.user);
    setToken(data.token);
  }

  async function register(
    name: string,
    email: string,
    password: string,
    role: string,
  ) {
    const data = await registerApi(name, email, password, role);

    localStorage.setItem("project-user", JSON.stringify(data.user));
    localStorage.setItem("project-token", data.token);

    setUser(data.user);
    setToken(data.token);
  }

  function logout() {
    setUser(null);
    setToken(null);

    localStorage.removeItem("project-user");
    localStorage.removeItem("project-token");
  }

  return (
    <AuthContext.Provider
      value={{ user, token, isLoading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("context is undefined");
  }

  return context;
}
