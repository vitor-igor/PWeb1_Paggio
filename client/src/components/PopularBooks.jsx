"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function PopularBooks() {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="w-auto">
      <div className="flex items-center justify-items-center">
        {books.length === 0 ? (
          <p className="text-zinc-500">Nenhum livro encontrado.</p>
        ) : (
          books.map((data) => (
            <Link href={`/details/${data.id}`} key={data.id}>
              <img src={data.image} alt={data.title} className="max-w-50 flex p-1.5 ml-2 mr-2" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
