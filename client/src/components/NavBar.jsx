"use client";

import Link from "next/link";
import { PiBookOpenBold } from "react-icons/pi";
import { useAuth } from "@/app/AuthContext"; // Importa o hook useAuth

export default function NavBar() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return null; // Opcional: não renderiza nada enquanto o status de login está sendo verificado
  }

  return (
    <>
      <div className="flex items-center justify-between justify-items-center p-4">
        <div className="flex items-center justify-items-center gap-24">
          <Link
            href="/"
            className="border-roxo-100 rounded-full border-2 p-1.5"
          >
            <PiBookOpenBold className="text-roxo-100 text-xl" />
          </Link>
          <ul className="flex gap-24">
            <li>
              <Link href="/search">Pesquisa de Livros</Link>
            </li>
            {user && (
              <li>
                <Link href="/profile">Perfil</Link>
              </li>
            )}
          </ul>
        </div>

        <ul className="flex gap-24">
          {user ? (
            <li>
              <button onClick={logout}>Sair</button>
            </li>
          ) : (
            <>
              <li>
                <Link href="/register">Cadastro</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
}