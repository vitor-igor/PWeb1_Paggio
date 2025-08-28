"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PopularBooks() {
  const [books, setBooks] = useState([]);
  const [limit, setLimit] = useState(4); // padrão (mobile)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://127.0.0.1:5000/api/books/popular");
        const data = await res.json();
        setBooks(data || []);
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  // ajusta quantidade conforme tela
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setLimit(4); // telas pequenas
      } else if (window.innerWidth < 1024) {
        setLimit(6); // telas médias
      } else {
        setLimit(8); // telas grandes
      }
    };

    handleResize(); // rodar na montagem
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const visibleBooks = books.slice(0, limit);

  return (
    <div className="mt-6 grid w-fit max-w-2xl grid-cols-1 gap-4 justify-self-center px-2 sm:m-5 sm:grid-cols-2 md:mt-12 md:gap-8 md:px-4 lg:max-w-5xl lg:grid-cols-4">
      {visibleBooks.length === 0 ? (
        <p className="col-span-full text-center text-zinc-500">
          Nenhum livro encontrado.
        </p>
      ) : (
        visibleBooks.map((data) => (
          <Link
            key={data.id}
            href={`/details/${data.id}`}
            className="flex flex-col items-center rounded-xl bg-branco-100 p-3 shadow-lg md:p-6 hover:scale-105"
          >
            <img
              src={data.image}
              alt={data.title}
              className="mb-3 w-30 rounded object-cover"
            />
            <h2 className="md:text-md mb-1 text-center text-xs font-bold text-azul-100 lg:text-lg">
              {data.title
                ? data.title.length > 30
                  ? data.title.slice(0, 30) + "..."
                  : data.title
                : "Obra desconhecida..."}
            </h2>
            <p className="text-center text-xs text-azul-100 sm:text-sm md:text-base">
              {data.authors
                ? data.authors.join(", ").length > 30
                  ? data.authors.join(", ").slice(0, 30).trim() + "..."
                  : data.authors.join(", ")
                : "Autor desconhecido"}
            </p>
          </Link>
        ))
      )}
    </div>
  );
}
