"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const router = useRouter();

  const handleName = (e) => {
    setUserName(e.target.value);
  };

  const handlePassword = (e) => {
    setUserPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name: userName,
      password: userPassword,
    };

    const res = await fetch(`http://127.0.0.1:5000/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="items-center justify-items-center rounded bg-white/5 p-8 backdrop-blur-md"
      >
        <h1 className="text-2xl font-bold">Login</h1>
        <div className="w-full">
          <label className="grid">
            <span>Usuário</span>
            <input
              type="text"
              name="name"
              placeholder="Digite seu usuário:"
              onChange={handleName}
              value={userName || ""}
              className="outline-none"
            />
          </label>
        </div>

        <div className="w-full pt-3">
          <label className="grid">
            <span>Senha</span>
            <input
              type="text"
              name="password"
              placeholder="Digite sua senha:"
              onChange={handlePassword}
              value={userPassword || ""}
              className="outline-none"
            />
          </label>
        </div>
        <div>
          <button
            type="submit"
            value="Enviar"
            className="bg-roxo-100 mt-5 w-sm"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
