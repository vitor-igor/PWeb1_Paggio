import Image from "next/image";
import Link from "next/link";

export default function Book(props) {
  const books = Array.isArray(props.books) ? props.books : [];

  return (
    <div className="w-auto">
      <div className="flex flex-wrap justify-center gap-5">
        {books.length === 0 ? (
          <p className="text-zinc-500">Nenhum livro encontrado.</p>
        ) : (
          books.map((data) => (
            <Link
              href={`/details/${data.id}`}
              key={data.id}
              className="book-card bg-branco-100 text-preto-100 flex h-auto w-100 gap-5 rounded-xl p-2"
            >
              <div className="relative h-[150px] w-[100px] shrink-0 overflow-hidden rounded-md">
                <Image
                  src={data.image || "/missingbook.webp"}
                  alt={data.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="book-info text-azul-100 font-bold">
                <h1>{data.title}</h1>
                <h4>
                  {data.authors
                    ? data.authors.join(", ").length > 30
                      ? data.authors.join(", ").slice(0, 30).trim() + "..."
                      : data.authors.join(", ")
                    : "Autor desconhecido"}
                </h4>
                <p>{data.published_date.slice(0, 4) || "Data não informada"}</p>
                <p>{data.pages || "?"} páginas</p>
                <p>
                  {data.genres
                    ? data.genres.join(", ").length > 30
                      ? data.genres.join(", ").slice(0, 30).trim() + "..."
                      : data.genres.join(", ")
                    : "Gênero deconhecido"}
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
