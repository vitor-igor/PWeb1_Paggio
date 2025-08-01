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

    const user = {
      name: name,
      email: email,
      password: password,
      image: image,
    };
    const res = await fetch(`http://127.0.0.1:5000/api/add/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
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
    <>
      <div className="flex h-screen items-center justify-center">
        <form
          onSubmit={handleSubmit}
          className="items-center justify-items-center rounded bg-white/5 p-8 backdrop-blur-md"
        >
          <h1 className="text-2xl font-bold">Cadastro</h1>
          <div className="w-full">
            <label className="grid">
              <span>Nome: </span>
              <input
                className="outline-none"
                placeholder="Digite seu usuário:"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div className="w-full pt-3">
            <label className="grid">
              <span>E-mail: </span>
              <input
                className="outline-none"
                placeholder="Digite seu e-mail:"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          <div className="w-full pt-3">
            <label className="grid">
              <span>Senha: </span>
              <input
                className="outline-none"
                placeholder="Digite sua senha:"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          </div>

          <div className="w-full pt-3">
            <label className="grid">
              <span>Foto de Perfil: </span>
              <input
                className="outline-none"
                placeholder="Informe a URL da imagem:"
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </label>
          </div>

          <div>
            <button
              type="submit"
              value="Enviar"
              className="bg-roxo-100 mt-5 w-xl"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
