import ModalBook from "@/app/details/[id]/components/ModalBook";
import Image from "next/image";

export default async function DetailBook({ params }) {
  const { id } = await params;

  const res = await fetch(`http://127.0.0.1:5000/api/books/details/${id}`);
  const data = await res.json();

  return (
    <>
      <div className="content flex">
        <div className="bg-branco-100 flex h-fit w-fit flex-col items-center justify-items-center gap-3 rounded-l-2xl p-3">
          <div className="image relative h-[300px] w-[200px] shrink-0 overflow-hidden rounded-md">
            <Image
              src={data.image || "/missingbook.webp"}
              alt={data.title}
              fill
              className="object-cover"
              quality={100}
            />
          </div>

          <ModalBook book_id={id} />
        </div>

        <div className="details bg-branco-100 text-preto-100 h-auto w-full p-6 pt-3">
          <h1 className="text-4xl">{data.title}</h1>
          <h2 className="text-xl">
            {data.authors
              ? data.authors.join(", ").length > 100
                ? data.authors.join(", ").slice(0, 100).trim() + "..."
                : data.authors.join(", ")
              : "Autor desconhecido"}
          </h2>
          <br />
          <h3>Sinopse:</h3>
          <p>{data.description}</p>
          <br />
          <h3>Data de publicação:</h3>
          <p>{data.published_date.split("-").reverse().join("/")}</p>
          <br />
          <h3>Gênero(s):</h3>
          <p>
            {data.genres
              ? data.genres.join(", ").length > 100
                ? data.genres.join(", ").slice(0, 100).trim() + "..."
                : data.genres.join(", ")
              : "Gênero deconhecido"}
          </p>
        </div>
      </div>
    </>
  );
}
