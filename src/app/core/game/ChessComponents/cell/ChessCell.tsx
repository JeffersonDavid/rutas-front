import React from "react";
import PieceComp from "../piece/piece"; // Importa el componente de pieza

interface ChessCellProps {
  piece: Piece | null; // Solo puede ser un objeto de tipo Piece o null
  isDark: boolean;
  isSelected: boolean;
  styles: React.CSSProperties;
  onClick: () => void;
}

export interface Piece {
  id: string; // Identificador de la pieza, como "b-p" para peón negro
  name: string;
  color: "white" | "black"; // Color de la pieza
}

const ChessCell: React.FC<ChessCellProps> = ({
  piece,
  isDark,
  isSelected,
  styles,
  onClick,
}) => {

  return (
    <div
      onClick={onClick}
      style={{
        ...styles,
        backgroundColor: isSelected ? "yellow" : isDark ? "#444" : "#888", // Resalta la celda seleccionada
        fontSize: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "50px", // Asegura que el tamaño de la celda sea adecuado
        width: "50px",
        cursor: "pointer",
      }}
    >
      {/* Renderiza la pieza si existe */}
      {piece && <PieceComp id={piece.id} size={20} color={piece.color} name={piece.name}/>}
    </div>
  );
};

export default ChessCell;
