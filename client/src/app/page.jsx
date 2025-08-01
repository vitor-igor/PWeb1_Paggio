import PopularBooks from "@/components/PopularBooks";

export default function HomePage() {
  return (
    <>
      <div className="min-h-screen items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
        <div className="text-roxo-100 items-center justify-items-center p-5 text-5xl">
          <p>Conheça a Paggio!</p>
        </div>

        <PopularBooks />
      </div>
    </>
  );
}
