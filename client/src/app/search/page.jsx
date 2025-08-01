"use client";

import Book from "@/app/search/components/Book";
import FilterSearch from "@/app/search/components/FilterSearch";
import SearchBar from "@/app/search/components/SearchBar";
import { useEffect } from "react";
import { create } from "zustand";

const useBookStore = create((set) => ({
  books: [],
  searchQuery: "",
  setBooks: (books) => set({ books }),
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default function Teste() {
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
  }, [searchQuery]);

  return (
    <>
      <div className="flex gap-5">
        <div className="left">
          <FilterSearch />
        </div>
        <div className="right w-full">
          <SearchBar onSearch={setSearchQuery} />
          <div className="mt-4 mb-4 grid gap-8">
            <Book books={books} />
          </div>
        </div>
      </div>
    </>
  );
}
