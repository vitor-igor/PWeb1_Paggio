"use client";

import PopularBooks from "@/components/PopularBooks";
import { useEffect, useState } from "react";

function StarRating({ rating }) {
  if (!rating) return null; 
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < rating ? "text-yellow-400" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.922-.755 1.688-1.54 1.118l-3.38-2.454a1 1 0 00-1.175 0l-3.38 2.454c-.784.57-1.838-.196-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
        </svg>
      ))}
    </div>
  );
}

export default function HomePage() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:5000/api/reviews/`);
        if (!res.ok) throw new Error("Erro ao buscar reviews");
        const data = await res.json();
        setReviews(data || []);
      } catch (error) {
        console.error(error);
        setReviews([]);
      }
    };
    fetchReviews();
  }, []);

  return (
    <div className="bg-preto-100 text-branco-100 flex min-h-[calc(100vh-64px)] w-[80dvw] flex-col justify-self-center">
      {/* Hero */}
      <section
        className="relative flex h-[22rem] w-full items-center justify-center rounded-bl-sm bg-cover bg-center p-8 sm:p-12 md:p-16 lg:h-[28rem] lg:p-20"
        style={{
          backgroundImage:
            "url('https://m.media-amazon.com/images/I/91DZobBc1BL.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-2xl text-center">
          <h1 className="mb-4 text-3xl font-bold sm:text-5xl">
            Bem-vindo ao <span className="text-roxo-100">Paggio</span>
          </h1>
          <p className="mb-6 text-sm sm:text-lg md:text-xl">
            Sua estante digital: descubra, organize e compartilhe suas leituras.
          </p>
          <a
            href="/register"
            className="bg-roxo-100 rounded-full px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Comece Agora
          </a>
        </div>
      </section>

      {/* Apresentação */}
      <section className="mx-auto w-full max-w-5xl px-4 py-12 text-center">
        <h2 className="mb-4 text-2xl font-bold sm:text-3xl">
          O que é o Paggio?
        </h2>
        <p className="mb-6 text-gray-300">
          O Paggio é a sua mais nova plataforma de leitura! <br /> Registre os
          livros que já leu, acompanhe seu progresso em tempo real, defina
          metas, escreva resenhas e monte listas personalizadas. Tudo em um só
          lugar!
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-lg bg-white/5 p-4 shadow">
            <h3 className="mb-2 text-lg font-semibold">📚 Sua Biblioteca</h3>
            <p className="text-sm text-gray-300">
              Organize todos os seus livros em uma biblioteca virtual prática e
              bonita.
            </p>
          </div>
          <div className="rounded-lg bg-white/5 p-4 shadow">
            <h3 className="mb-2 text-lg font-semibold">🎯 Metas</h3>
            <p className="text-sm text-gray-300">
              Crie objetivos de leitura anuais, mensais ou pessoais e acompanhe
              seu progresso.
            </p>
          </div>
          <div className="rounded-lg bg-white/5 p-4 shadow">
            <h3 className="mb-2 text-lg font-semibold">⭐ Comunidade</h3>
            <p className="text-sm text-gray-300">
              Leia resenhas, compartilhe opiniões e descubra novos livros com a
              ajuda de outros leitores.
            </p>
          </div>
        </div>
      </section>

      {/* Vitrine */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-center text-xl font-bold sm:text-2xl">
          Livros Populares
        </h2>
        <PopularBooks />
      </section>

      {/* Reviews */}
      <section className="mx-auto w-full max-w-6xl px-4 py-12">
        <h2 className="mb-6 text-center text-xl font-bold sm:text-2xl">
          Últimas Resenhas
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {reviews.slice(0,4).map((r, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl bg-white/10 p-4 shadow"
            >
              <div className="mb-2 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img
                    src={r.user.image} 
                    alt={r.user.name} 
                    className="border-roxo-100 h-8 w-8 rounded-full border-2 object-cover"
                  />
                  <span className="font-semibold">{r.user.name}</span>{" "}
                </div>
              </div>
              <p className="mt-2 text-sm text-gray-300 italic">"{r.text}"</p>{" "}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
