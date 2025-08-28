"use client";

import PopularBooks from "@/components/PopularBooks";

// Dados de exemplo
const reviews = [
  {
    book: "O Leão, a Feiticeira e o Guarda-Roupa",
    user: "magao",
    avatar:
      "https://i.pinimg.com/236x/52/52/d6/5252d6181380a508dbf9e9066afbcb97.jpg",
    rating: 5,
    comment:
      "Eu só entro em guarda roupa pra me esconder do meu tio haha, brincadeiras à parte é um ótimo livro, recomendo!",
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv95vID5vCl7oKEOxGzZLRt6Ev25cSu1-AxA&s",
  },
  {
    book: "Dom Casmurro",
    user: "chico besta fera",
    avatar:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLv2KlDKneKUdoAzMCJnOrcqu3OcU20g-wbA&s",
    rating: 1,
    comment: "Esse Bentinho é muito é corno",
    cover: "https://m.media-amazon.com/images/I/61Z2bMhGicL.jpg",
  },
  {
    book: "1984",
    user: "kevin6721",
    avatar:
      "https://www.shutterstock.com/image-illustration/generic-human-man-face-front-260nw-519713362.jpg",
    rating: 5,
    comment:
      "Escrever sobre os dias de hoje como se fosse o futuro eu também consigo.",
    cover:
      "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
  },
];

function StarRating({ rating }) {
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
          {reviews.map((r, i) => (
            <div
              key={i}
              className="flex flex-col rounded-xl bg-white/10 p-4 shadow"
            >
              <div className="mb-2 flex items-center gap-3">
                <img
                  src={r.cover}
                  alt={r.book}
                  className="h-14 w-10 rounded object-cover"
                />
                <div className="flex items-center gap-2">
                  <img
                    src={r.avatar}
                    alt={r.user}
                    className="border-roxo-100 h-8 w-8 rounded-full border-2 object-cover"
                  />
                  <span className="font-semibold">{r.user}</span>
                </div>
              </div>
              <span className="text-roxo-100 font-semibold">{r.book}</span>
              <StarRating rating={r.rating} />
              <p className="mt-2 text-sm text-gray-300 italic">"{r.comment}"</p>
            </div>
          ))}
        </div>
      </section>

      
    </div>
  );
}
