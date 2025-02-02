interface KnightProps {
  color: "black" | "white"; // El color de la pieza
}

export const Knight: React.FC<KnightProps>  = ({ color }) => {

  const blackKnightImage = "/images/caballon.png";
  const whiteKnightImage = "/images/knight-w.png";

  if (color === "black") {
    return (
      <img
        src={blackKnightImage}
        alt="Black Pawn"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    );
  }

  // Para el color blanco, se usa el SVG predeterminado
    return (
      <img
        src={whiteKnightImage}
        alt="Black Pawn"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    );
};
