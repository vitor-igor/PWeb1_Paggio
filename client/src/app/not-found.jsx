import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <h1>Parece que essa página não existe :/</h1>
      <Link href="/">Voltar para Home</Link>
    </>
  );
}
