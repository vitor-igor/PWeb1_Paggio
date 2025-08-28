import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import ModalBook from "./components/ModalBook";

const StarRating = ({ rating = 0 }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<FaStar key={i} />);
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(<FaStarHalfAlt key={i} />);
    } else {
      stars.push(<FaRegStar key={i} />);
    }
  }
  return <div className="flex text-yellow-400">{stars}</div>;
};

export default async function DetailBookPage({ params }) {
  const { id } = params;

  const [bookRes, reviewsRes] = await Promise.all([
    fetch(`http://127.0.0.1:5000/api/books/details/${id}`),
    fetch(`http://127.0.0.1:5000/api/reviews/${id}`),
  ]);

  if (!bookRes.ok) {
    return (
      <div className="p-12 text-center text-white">Livro não encontrado.</div>
    );
  }

  const book = await bookRes.json();
  const allReviews = reviewsRes.ok ? await reviewsRes.json() : [];
  const recentReviews = allReviews.slice(0, 3);

  const mockSuggestions = [
    { id: 1, image: "/missingbook.webp", title: "Sugestão 1" },
    { id: 2, image: "/missingbook.webp", title: "Sugestão 2" },
    { id: 3, image: "/missingbook.webp", title: "Sugestão 3" },
    { id: 4, image: "/missingbook.webp", title: "Sugestão 4" },
    { id: 5, image: "/missingbook.webp", title: "Sugestão 5" },
  ];

  return (
    <main className="min-h-screen bg-[#1f182a] p-4 text-[#fdf3f2] sm:p-8 lg:p-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
          {/* Coluna Esquerda: Capa e Sumário (Centralizada em todas as telas) */}
          <div className="flex w-full flex-col items-center gap-6 lg:col-span-1">
            <div className="relative mx-auto h-[450px] w-[300px] overflow-hidden rounded-lg shadow-2xl shadow-black/50">
              <Image
                src={book.image || "/missingbook.webp"}
                alt={book.title}
                fill
                className="object-cover"
                quality={100}
                priority
              />
            </div>

            {/* modais */}
            <ModalBook book_id={id} />

            <div className="mx-auto w-full max-w-sm rounded-lg bg-black/30 p-6">
              <h3 className="mb-4 border-b border-white/20 pb-2 text-2xl font-bold">
                Sumário
              </h3>
              <div className="space-y-3 text-sm">
                <p>
                  <span className="font-semibold">Autor(a):</span>{" "}
                  {book.authors?.join(", ") || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Data de Publicação:</span>{" "}
                  {book.published_date
                    ? new Date(book.published_date).toLocaleDateString(
                        "pt-BR",
                        { timeZone: "UTC" },
                      )
                    : "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Gênero(s):</span>{" "}
                  {book.genres?.join(", ") || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">ISBN:</span>{" "}
                  {book.isbn || "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Detalhes, Reviews e Sugestões */}
          <div className="flex flex-col gap-8 lg:col-span-2">
            <div>
              <h1 className="text-center text-4xl font-bold tracking-tight lg:text-left lg:text-5xl">
                {book.title}
              </h1>
              <h2 className="mt-2 text-center text-xl text-white/70 lg:text-left lg:text-2xl">
                {book.authors?.join(", ") || "Autor Desconhecido"}
              </h2>
              <p className="mt-4 text-lg italic">
                {book.description || "Sem descrição disponível."}
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Resenhas Recentes</h3>
              <div className="space-y-4">
                {recentReviews.length > 0 ? (
                  recentReviews.map((review) => (
                    <div
                      key={review.id}
                      className="flex items-start gap-4 rounded-lg bg-white/10 p-4"
                    >
                      <Image
                        src={review.user?.image || "/default-avatar.png"}
                        alt={review.user?.name || "Usuário"}
                        width={48}
                        height={48}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <p className="font-bold">{review.user?.name}</p>
                          <StarRating rating={review.rating || 4.5} />
                        </div>
                        <p className="mt-1 text-white/80">{review.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-white/60">
                    Nenhuma resenha encontrada ainda.
                  </p>
                )}
              </div>
              <Link href={`/reviews/${id}`}>
                <button className="w-full rounded-lg bg-[#93256c] px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-[#a3367c]">
                  Ver todas as reviews
                </button>
              </Link>
            </div>

            <div className="space-y-4">
              <h3 className="text-3xl font-bold">Mais Sugestões</h3>
              <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-4">
                {mockSuggestions.map((suggestion) => (
                  <Link href="#" key={suggestion.id} className="flex-shrink-0">
                    <Image
                      src={suggestion.image}
                      alt={suggestion.title}
                      width={120}
                      height={180}
                      className="rounded-md object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
