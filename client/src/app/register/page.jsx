"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = { name, email, password, image };

    const res = await fetch(`http://127.0.0.1:5000/api/add/user`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    if (res.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setImage("");
      router.replace("/login");
    } else {
      alert("Não foi possível criar seu usuário.");
    }
  };

  return (
    <div className="bg-preto-100 flex min-h-[calc(100dvh-64px)] lg:w-full sm:w-dvw items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="border-roxo-100 bg-roxo-100/10 flex w-full max-w-lg flex-col gap-5 rounded-3xl border-2 p-6 shadow-2xl backdrop-blur-md sm:p-8"
      >
        <h1 className="text-roxo-100 mb-2 text-center text-2xl font-extrabold tracking-tight sm:text-3xl">
          Cadastro
        </h1>

        <div>
          <label
            className="text-roxo-100 mb-2 block text-sm font-semibold sm:text-base"
            htmlFor="name"
          >
            Nome
          </label>
          <input
            className="border-roxo-100 bg-branco-100 text-preto-100 focus:ring-roxo-100 w-full rounded-xl border px-3 py-2 shadow transition-all focus:ring-2 focus:outline-none sm:px-4"
            placeholder="Digite seu usuário"
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="username"
          />
        </div>

        <div>
          <label
            className="text-roxo-100 mb-2 block text-sm font-semibold sm:text-base"
            htmlFor="email"
          >
            E-mail
          </label>
          <input
            className="border-roxo-100 bg-branco-100 text-preto-100 focus:ring-roxo-100 w-full rounded-xl border px-3 py-2 shadow transition-all focus:ring-2 focus:outline-none sm:px-4"
            placeholder="Digite seu e-mail"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
          />
        </div>

        <div>
          <label
            className="text-roxo-100 mb-2 block text-sm font-semibold sm:text-base"
            htmlFor="password"
          >
            Senha
          </label>
          <input
            className="border-roxo-100 bg-branco-100 text-preto-100 focus:ring-roxo-100 w-full rounded-xl border px-3 py-2 shadow transition-all focus:ring-2 focus:outline-none sm:px-4"
            placeholder="Digite sua senha"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
          />
        </div>

        <div>
          <label
            className="text-roxo-100 mb-2 block text-sm font-semibold sm:text-base"
            htmlFor="image"
          >
            Foto de Perfil (URL)
          </label>
          <input
            className="border-roxo-100 bg-branco-100 text-preto-100 focus:ring-roxo-100 w-full rounded-xl border px-3 py-2 shadow transition-all focus:ring-2 focus:outline-none sm:px-4"
            placeholder="Informe a URL da imagem"
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          className="bg-roxo-100 text-branco-100 mt-2 w-full rounded-xl px-6 py-2 font-bold shadow-lg transition-all hover:bg-[#a63a7e]"
        >
          Enviar
        </button>

        <div className="flex justify-center gap-3">
          <p>Já possui uma conta?</p>
          <a
            href="/login"
            className="text-roxo-100 font-bold hover:text-[#a63a7e]"
          >
            Login
          </a>
        </div>
      </form>
    </div>
  );
}