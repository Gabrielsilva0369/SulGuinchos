/** Tela exibida quando o IP do visitante está na lista de bloqueio. */
function Blocked() {
  return (
    <main
      className="page-shell"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        textAlign: "center",
      }}
    >
      <p
        style={{
          fontFamily: "var(--fonte-corpo)",
          fontSize: "16px",
          color: "var(--cor-cinza-texto)",
        }}
      >
        Conteúdo indisponível.
      </p>
    </main>
  );
}

export default Blocked;
