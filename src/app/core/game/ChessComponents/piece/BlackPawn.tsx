import React from "react";

interface PawnProps {
  color: "black" | "white"; // El color de la pieza
}

export const Pawn: React.FC<PawnProps> = ({ color }) => {
  // Ruta de la imagen para el color negro
  const blackPawnImage = "/images/peon.png"; // Asegúrate de que esta imagen exista en `public/images`

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
      src="/images/peon-w.png"
      alt="Black Pawn"
      style={{
        width: "100%",
        height: "100%",
      }}
    />
  );
};
