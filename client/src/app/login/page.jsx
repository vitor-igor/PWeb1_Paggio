"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name: userName, password: userPassword };

    const res = await fetch("http://127.0.0.1:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include",
    });

    if (res.ok) {
      setUserName("");
      setUserPassword("");
      router.replace("/profile");
    } else {
      alert("Credenciais inválidas.");
    }
  };

  return (
    <div className="bg-preto-100 flex min-h-[calc(100dvh-64px)] lg:w-full sm:w-dvw items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="border-roxo-100 bg-roxo-100/10 flex w-full max-w-sm flex-col gap-6 rounded-3xl border-2 p-8 shadow-2xl backdrop-blur-md"
      >
        <h1 className="text-roxo-100 mb-2 text-center text-3xl font-extrabold tracking-tight">
          Login
        </h1>
        <div>
          <label
            className="text-roxo-100 mb-2 block font-semibold"
            htmlFor="name"
          >
            Usuário
          </label>
          <input
            type="text"
            id="name"
            placeholder="Digite seu usuário"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
            className="border-roxo-100 bg-branco-100 text-preto-100 focus:ring-roxo-100 w-full rounded-xl border px-4 py-2 shadow transition-all focus:ring-2 focus:outline-none"
            autoComplete="username"
          />
        </div>
        <div>
          <label
            className="text-roxo-100 mb-2 block font-semibold"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            type="password"
            id="password"
            placeholder="Digite sua senha"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            className="border-roxo-100 bg-branco-100 text-preto-100 focus:ring-roxo-100 w-full rounded-xl border px-4 py-2 shadow transition-all focus:ring-2 focus:outline-none"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="bg-roxo-100 text-branco-100 mt-2 w-full rounded-xl px-6 py-2 font-bold shadow-lg transition-all hover:brightness-110"
        >
          Entrar
        </button>

        <div className="flex justify-center gap-3">
          <p>Ainda não possui uma conta?</p>
          <a
            href="/register"
            className="text-roxo-100 font-bold hover:text-[#a63a7e]"
          >
            Cadastre-se
          </a>
        </div>
      </form>
    </div>
  );
}