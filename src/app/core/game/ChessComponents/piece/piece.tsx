// Piece.tsx
import React from "react";
import { Pawn } from "./BlackPawn"; // Importa las piezas
import { Rook } from "./Rook";
import { Bishop } from "./Bishop";
import { Knight } from "./Knight";

// Define el mapa de las piezas disponibles como funciones que devuelven JSX
// Define el mapa de las piezas disponibles como funciones que devuelven JSX
const pieceSVGs: Record<string, (props: { color: string; size?: number }) => JSX.Element> = {
    "pawn": ({ color, size }) => <Pawn color={color} />, // Configura el peón blanco
    "rook": ({ color, size }) => <Rook color={color} />, // Configura el peón blanco
    "bishop": ({ color, size }) => <Bishop color={color} />, // Configura el peón blanco
    "knight": ({ color, size }) => <Knight color={color} />, // Configura el peón blanco
    
  };

interface PieceProps {
  id: string; // El identificador de la pieza, como "b-p"
  size?: number; // Tamaño de la pieza
  color: "black" | "white"; // Color de la pieza
  name:string
}

const Piece: React.FC<PieceProps> = ({ id, size = 35, color, name }) => {
  const renderPiece = pieceSVGs[name]; // Buscar el renderizador correspondiente

  if (!renderPiece) {
    return name; // Si no existe la pieza, no renderiza nada
  }

  return (
    <div
      style={{
        width: size,
        height: size,
      }}
    >
      {renderPiece({ color, size })} {/* Renderiza la pieza con las props pasadas */}
    </div>
  );
};

export default Piece;
