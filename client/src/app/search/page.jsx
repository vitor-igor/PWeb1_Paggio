"use client";

import SearchBar from "@/app/search/components/SearchBar";
import Book from "./components/Book";
import { useEffect } from "react";
import { create } from "zustand";

const useBookStore = create((set) => ({
  books: [],
  searchQuery: "",
  setBooks: (books) => set({ books }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default function SearchPage() {
  const { books, setBooks, searchQuery, setSearchQuery } = useBookStore();

  useEffect(() => {
    const fetchBooks = async () => {
      if (!searchQuery.trim()) {
        setBooks([]);
        return;
      }

      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/books/${encodeURIComponent(searchQuery)}`,
          {
            credentials: "include",
          },
        );
        const data = await res.json();
        setBooks(data || []);
      } catch (err) {
        console.error("Erro ao buscar livros:", err);
        setBooks([]);
      }
    };

    fetchBooks();
  }, [searchQuery, setBooks]);

  return (
    <div className="bg-preto-100 flex min-h-[calc(100vh-64px)] w-full flex-col items-center justify-self-center px-2 py-6 sm:px-4 sm:py-12 lg:w-[80dvw]">
      <div className="bg-preto-100 border-roxo-100 flex min-h-[80vh] w-full flex-col rounded-2xl border p-4 shadow-2xl sm:p-8">
        <h1 className="text-branco-100 mb-6 text-center text-2xl font-extrabold tracking-tight drop-shadow-lg sm:mb-8 sm:text-4xl">
          <span className="text-roxo-100">Pesquisa</span> de Livros
        </h1>

        <div className="mb-6 sm:mb-8">
          <SearchBar onSearch={setSearchQuery} />
        </div>

        <div
          className={`bg-roxo-100/10 mt-4 flex-1 rounded-3xl text-center shadow-[0_8px_32px_#93256c33] transition-all duration-300 ${
            books.length ? "p-4" : "p-2"
          }`}
        >
          <Book books={books} />
          {!books.length && (
            <div className="mt-2 flex h-full items-center justify-center font-semibold opacity-70 sm:text-lg">
              {/* placeholder vazio */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
