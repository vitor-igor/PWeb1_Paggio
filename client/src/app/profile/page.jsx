"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookshelfData, setBookshelfData] = useState({});
  const [loading, setLoading] = useState(true);

  const bookshelfs = ["lido", "lendo", "quero ler", "relendo", "abandonei"];

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/user/perfil", {
          credentials: "include",
        });

        if (res.status === 200) {
          const data = await res.json();
          setUser(data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Falha ao buscar perfil:", error);
        setUser(null);
      }
    };
    fetchPerfil();
  }, []);

  useEffect(() => {
    const fetchBookshelves = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      setLoading(true);
      const data = {};

      // Itera sobre a lista de estantes para buscar os dados de cada uma
      for (const shelfName of [...bookshelfs, "thebest"]) {
        try {
          const res = await fetch(
            `http://127.0.0.1:5000/api/books/status_book/${shelfName}`,
            {
              credentials: "include",
            },
          );

          if (res.ok) {
            const books = await res.json();
            data[shelfName] = books;
          } else {
            data[shelfName] = [];
          }
        } catch (error) {
          console.error(`Falha ao buscar estante '${shelfName}':`, error);
          data[shelfName] = [];
        }
      }
      setBookshelfData(data);
      setLoading(false);
    };

    if (user) {
      fetchBookshelves();
    }
  }, [user]);

  const handleLogout = async () => {
    const res = await fetch("http://127.0.0.1:5000/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      alert("Logout realizado com sucesso!");
      setUser(null);
      window.location.href = "/login";
    } else {
      alert("Erro ao tentar fazer logout.");
    }
  };

  if (loading || user === null) {
    return <p className="p-4">Carregando...</p>;
  }

  if (!user) {
    return <p className="p-4">Você não está logado :/</p>;
  }

  return (
    <div className="mb-5 min-h-[calc(100vh-64px)] bg-[#1f182a] font-[Inter] text-[#fdf3f2]">
      {/* Banner */}
      <section className="relative h-[300px] rounded-lg bg-gradient-to-b from-black/40 to-black/80"></section>

      {/* Perfil */}
      <main className="relative -mt-20 px-8">
        <div className="flex flex-col items-center gap-6 md:flex-row md:items-center">
          {/* Avatar */}
          <div className="relative h-[150px] w-[150px] overflow-hidden rounded-full border-4 border-[#1f182a] bg-[#2a223a]">
            {user.image && user.image.trim() !== "" ? (
              <Image
                src={user.image}
                alt="Imagem de perfil"
                fill
                className="rounded-full object-cover"
              />
            ) : null}
          </div>

          {/* Info */}
          <div>
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-white/70">{user.bio || "Sem descrição"}</p>
          </div>

          {/* Stats */}
          <div className="ml-auto flex gap-8 text-center">
            <table>
              <tbody>
                <tr>
                  <td className="pr-4">
                    <span className="block text-xl font-bold">69</span>
                    <span className="text-sm text-white/60">lidos</span>
                  </td>
                  <td className="pr-4">
                    <span className="block text-xl font-bold">113</span>
                    <span className="text-sm text-white/60">lendo</span>
                  </td>
                  <td className="pr-4">
                    <span className="block text-xl font-bold">1</span>
                    <span className="text-sm text-white/60">seguindo</span>
                  </td>
                  <td>
                    <span className="block text-xl font-bold">3.000</span>
                    <span className="text-sm text-white/60">seguidores</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr className="mt-5" />

        {/* Conteúdo dinâmico das estantes */}
        <div className="mt-8 flex flex-col gap-8 md:flex-row md:justify-between">
          {/* Coluna de Estantes (Esquerda) */}
          <div className="flex flex-1 flex-col gap-8">
            {bookshelfs.map((shelfName) => (
              <section key={shelfName}>
                <h2 className="mb-4 text-lg font-medium">
                  {shelfName.charAt(0).toUpperCase() + shelfName.slice(1)}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {bookshelfData[shelfName]?.length > 0 ? (
                    bookshelfData[shelfName].map((book) => (
                      <div
                        key={book.id}
                        className="relative aspect-[2/3] w-32 overflow-hidden rounded bg-[#2a223a] transition-transform duration-200 ease-in-out hover:scale-105"
                      >
                        <Link href={`/details/${book.id}`} passHref>
                          <Image
                            src={book.image}
                            alt={book.title}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>
                    ))
                  ) : (
                    <p className="col-span-3 text-white/60">
                      Nenhum livro nesta estante.
                    </p>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* Coluna Direita (para 'THE BEST') */}
          <div className="flex-1">
            {bookshelfData.thebest?.length > 0 && (
              <section>
                <h2 className="mb-4 text-lg font-medium">THE BEST</h2>
                <div className="relative h-96 w-64 overflow-hidden rounded bg-[#2a223a] transition-transform duration-200 ease-in-out hover:scale-105">
                  <Link
                    href={`/details/${bookshelfData.thebest[0].id}`}
                    passHref
                  >
                    <Image
                      src={bookshelfData.thebest[0].image}
                      alt={bookshelfData.thebest[0].title}
                      fill
                      className="object-cover"
                    />
                  </Link>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Botão Logout */}
        <div className="mt-10">
          <button
            onClick={handleLogout}
            className="rounded-xl bg-[#93256c] px-6 py-2 text-white transition-all hover:bg-[#a33a7a]"
          >
            Sair
          </button>
        </div>
      </main>
    </div>
  );
}
