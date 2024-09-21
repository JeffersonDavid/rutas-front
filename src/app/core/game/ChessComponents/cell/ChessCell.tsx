import React from 'react';

interface ChessCellProps {
  piece: string | null | Piece;  // 'piece' puede ser un string, null o un objeto de tipo Piece
  isDark: boolean;
  isSelected: boolean;
  styles: React.CSSProperties;
  onClick: () => void;
}

export interface Piece {
  id: number;
  color: 'white' | 'black';  // Color de la pieza
}

const ChessCell: React.FC<ChessCellProps> = ({ piece, isDark, isSelected, styles, onClick }) => {
  // Verificamos si piece es un objeto del tipo Piece
  const pieceContent = piece && typeof piece === 'object' ? piece.id : piece;

  // Inicializamos piece_ solo si piece es de tipo Piece
  let piece_: Piece | null = null;
  if (piece && typeof piece === 'object' && 'id' in piece && 'hash' in piece) {
    piece_ = { id: piece.id  , color:piece.color};
  }

  return (
    <div
      onClick={onClick}
      style={{
        ...styles,
        backgroundColor: isSelected ? 'yellow' : isDark ? '#444' : '#888',  // Resalta la celda seleccionada
        color: pieceContent ? '#fff' : '#f9f9f9',
        fontSize: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',  // Asegura que el tamaño de la celda sea adecuado
        width: '50px',
        cursor: 'pointer',
      }}
    >
      {pieceContent || ''}
    </div>
  );
};

export default ChessCell;
