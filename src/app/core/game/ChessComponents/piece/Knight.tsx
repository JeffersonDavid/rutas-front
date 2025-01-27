interface KnightProps {
  color: "black" | "white"; // El color de la pieza
}

export const Knight: React.FC<KnightProps>  = ({ color }) => {

  const blackPawnImage = "/images/caballon.png";
  const whitePawnImage = "/images/caballo.png";

  if (color === "black") {
    return (
      <img
        src={blackPawnImage}
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
        src={whitePawnImage}
        alt="Black Pawn"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    );
};
