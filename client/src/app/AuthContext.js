"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/user/perfil", {
        credentials: "include", // Importante para enviar os cookies de sessão
      });

      if (res.status === 200) {
        const userData = await res.json();
        setUser(userData);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Falha ao buscar perfil:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/logout", {
        method: "POST",
        credentials: "include",
      });
      if (res.ok) {
        setUser(null);
        router.push("/login");
      } else {
        alert("Erro ao tentar fazer logout.");
      }
    } catch (error) {
      alert("Erro ao tentar fazer logout.");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = { user, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}