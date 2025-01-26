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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="100%"
      height="100%"
      fill={color} // Usamos el color pasado como prop
    >
      <circle cx="50" cy="30" r="12" />
      <rect x="40" y="45" width="20" height="25" />
      <ellipse cx="50" cy="80" rx="25" ry="8" />
    </svg>
  );
};
