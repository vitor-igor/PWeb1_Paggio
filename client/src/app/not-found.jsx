import Link from "next/link";
import { PiBookOpenBold } from "react-icons/pi";

export default function NotFound() {
  return (
    <div className="bg-preto-100 text-branco-100 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 text-center">
      <div className="border-roxo-100 mb-6 rounded-full border-6 p-4">
        <PiBookOpenBold className="text-roxo-100 text-6xl" />
      </div>

      <h1 className="mb-3 text-2xl font-extrabold tracking-tight md:text-4xl">
        Ops! Página não encontrada...
      </h1>
      <p className="mb-6 max-w-lg text-sm text-zinc-300 md:text-base">
        Parece que você se perdeu entre as páginas... Que tal voltar para a
        estante e escolher outro livro?
      </p>

      <Link
        href="/"
        className="bg-roxo-100 text-branco-100 rounded-xl px-6 py-2 font-bold shadow-lg transition-all hover:bg-[#a63a7e]"
      >
        Voltar para Home
      </Link>
</div>);
}