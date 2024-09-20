import React from 'react';

interface ChessCellProps {
  piece: string | null | { [key: string]: any };
  isDark: boolean;
  isSelected: boolean;
  styles: React.CSSProperties;
  onClick: () => void;
}

const ChessCell: React.FC<ChessCellProps> = ({ piece, isDark, isSelected, styles, onClick }) => {
  const pieceContent = piece && typeof piece === 'object' ? piece.id : piece;

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
