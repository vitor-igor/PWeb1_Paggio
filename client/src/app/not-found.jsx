import Link from "next/link";

export default function NotFound() {
  return (
    <>
      {/* <h1>Parece que essa página não existe :/</h1>
      <Link href="/">Voltar para Home</Link>
       */}
      <div style={{
        background: "#1f182a",
        color: "#fdf3f2",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "2rem"
      }}>
        {/* Ícone de livro */}
        <div style={{
          fontSize: "5rem",
          marginBottom: "1rem"
        }}>
          📚 {/* Gostaria de colocar o icone do site */}
        </div>
        {/* Mensagem */}
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        Ops! Página não encontrada...
      </h1>
      <p style={{ maxWidth: "500px", marginBottom: "2rem" }}>
        Parece que você se perdeu entre as páginas...  
        Que tal voltar para a estante e escolher outro livro?
      </p>
      
      {/* Botão de voltar */}
      <Link href="/" style={{
        backgroundColor: "#93256c",
        color: "#fdf3f2",
        padding: "0.8rem 1.5rem",
        borderRadius: "8px",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "1rem",
        transition: "background 0.3s"
      }}
      >
        Voltar para Home
      </Link>

      </div>
    </>
  );
}


