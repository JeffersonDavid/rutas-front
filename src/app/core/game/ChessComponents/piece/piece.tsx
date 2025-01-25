// Piece.tsx
import React from "react";
import { Pawn } from "./BlackPawn"; // Importa las piezas
import { Rook } from "./Rook";
import { Bishop } from "./Bishop";
import { Knight } from "./Knight";

// Define el mapa de las piezas disponibles como funciones que devuelven JSX
// Define el mapa de las piezas disponibles como funciones que devuelven JSX
const pieceSVGs: Record<string, (props: { color: string; size?: number }) => JSX.Element> = {
    "w-p": ({ color, size }) => <Pawn color={color} />, // Configura el peón blanco
    "b-p": ({ color, size }) => <Pawn color={color} />, // Configura el peón negro
    "w-r": ({ color, size }) => <Rook color={color} />, 
    "b-r": ({ color, size }) => <Rook color={color} />, 
    "b-b": ({ color, size }) => <Bishop color={color} />, 
    "w-b": ({ color, size }) => <Bishop color={color} />, 
    //"w-k": ({ color, size }) => <Knight color={color} />, 
    //"b-k": ({ color, size }) => <Knight color={color} />, 
    
    // Agrega más piezas aquí en el formato "color-tipo"
  };

interface PieceProps {
  id: string; // El identificador de la pieza, como "b-p"
  size?: number; // Tamaño de la pieza
  color: "black" | "white"; // Color de la pieza
}

const Piece: React.FC<PieceProps> = ({ id, size = 35, color }) => {
  const renderPiece = pieceSVGs[id]; // Buscar el renderizador correspondiente

  if (!renderPiece) {
    return id; // Si no existe la pieza, no renderiza nada
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
