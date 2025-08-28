"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image"; 

export default function ReviewsPage() {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchReviews = async () => {
    if (!bookId) return;
    try {
      const res = await fetch(`http://127.0.0.1:5000/api/reviews/${bookId}`);
      if (!res.ok) throw new Error("Erro ao buscar reviews");
      const data = await res.json();
      setReviews(data || []);
    } catch (error) {
      console.error(error);
      setReviews([]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!bookId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      try {
        const [bookRes, reviewsRes] = await Promise.all([
          fetch(`http://127.0.0.1:5000/api/books/details/${bookId}`),
          fetch(`http://127.0.0.1:5000/api/reviews/${bookId}`),
        ]);

        if (bookRes.ok) {
          const bookData = await bookRes.json();
          setBook(bookData);
        } else {
          console.error("Erro ao carregar livro:", await bookRes.text());
          setBook(null);
        }

        if (reviewsRes.ok) {
          const reviewsData = await reviewsRes.json();
          setReviews(reviewsData || []);
        } else {
          console.error("Erro ao buscar reviews:", await reviewsRes.text());
          setReviews([]); 
        }
      } catch (err) {
        console.error("Falha geral ao carregar dados:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookId]);

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (newComment.trim() === "") {
      alert("Por favor, adicione um comentário.");
      return;
    }
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/api/reviews/${bookId}/add`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: newComment }),
          credentials: "include",
        },
      );
      const result = await response.json();
      if (response.ok) {
        setNewComment("");
        fetchReviews();
      } else {
        alert(`Erro: ${result.message}`);
      }
    } catch (error) {
      console.error("Falha ao enviar avaliação:", error);
      alert("Ocorreu um erro. Verifique se você está logado.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1f182a] text-[#fdf3f2]">
        Carregando...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#1f182a] text-[#fdf3f2]">
        Livro não encontrado.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
      <div className="space-y-4 md:col-span-2">
        <h2 className="text-lg font-semibold text-white">
          Resenhas de: <span className="font-bold">{book.title}</span>{" "}
          <span className="opacity-70">{book.published_date}</span>
        </h2>

        <form
          onSubmit={handleSubmitReview}
          className="my-6 rounded-lg bg-[#2a5a8d] p-4 shadow-lg"
        >
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escreva sua resenha..."
            className="w-full bg-transparent text-lg placeholder-gray-300 focus:outline-none"
          />
          <div className="mt-4 flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-[#93256c] px-5 py-2 font-semibold text-white transition-opacity hover:opacity-90"
            >
              Enviar
            </button>
          </div>
        </form>

        {/* Reviews */}
        <div className="space-y-8">
          {reviews.length === 0 ? (
            <p className="text-gray-400">Nenhuma resenha ainda.</p>
          ) : (
            reviews.map((review) => (
              <div key={review.id} className="flex items-start space-x-4 w-full">
                <img
                  src={review.user?.image || "/default-avatar.png"}
                  alt={review.user?.name || "Usuário"}
                  className="mt-1 h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1 border-b border-gray-700 pb-4">
                  <div className="flex items-center space-x-3">
                    <p className="text-lg font-bold">
                      {review.user?.name || "Usuário"}
                    </p>
                    <p className="text-sm text-gray-400">
                      - {review.date || "sem data"}
                    </p>
                  </div>
                  <p className="mt-2 text-gray-300">{review.text}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <Image
          src={book.image || "/missingbook.webp"}
          alt={book.title}
          width={250}
          height={350}
          className="rounded-md shadow-lg"
        />
        <p className="text-sm text-gray-400">{reviews.length} comentários</p>

        <hr className="w-full border-gray-600" />

        <div className="w-full">
          <h3 className="mb-2 font-semibold text-gray-300">Sugestões</h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col items-center text-center">
              <Image
                src="/missingbook.webp"
                alt="Sugestão"
                width={120}
                height={160}
                className="rounded"
              />
              <p className="text-xs text-gray-400">102 comentários</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Image
                src="/missingbook.webp"
                alt="Sugestão"
                width={120}
                height={160}
                className="rounded"
              />
              <p className="text-xs text-gray-400">87 comentários</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
