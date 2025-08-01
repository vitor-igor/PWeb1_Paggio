"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchPerfil = async () => {
      const res = await fetch("http://127.0.0.1:5000/api/user/perfil", {
        credentials: "include",
      });

      if (res.status === 200) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      alert("Logout realizado com sucesso!");
      setUser(null);
    } else {
      alert("Erro ao tentar fazer logout.");
    }
  };

  if (!user) {
    return <p className="p-4">Você não está logado :/</p>;
  }

  return (
    <div className="bg-branco-100 text-preto-100 min-h-screen items-center justify-items-center gap-16 p-8 pb-20">
      <h3 className="text-2xl">Nome: {user.name}</h3>
      <p>E-mail: {user.email}</p>
      <div className="relative h-[200px] w-[200px] overflow-hidden">
        <Image
          src={user.image}
          fill
          alt="Imagem de perfil"
          className="rounded-full object-cover"
        />
      </div>
      <button
        onClick={handleLogout}
        className="bg-roxo-100 hover:bg-roxo-200 mt-6 cursor-pointer rounded-xl px-4 py-2 text-white transition-all"
      >
        Sair
      </button>
    </div>
  );
}
