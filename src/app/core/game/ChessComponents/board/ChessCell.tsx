import React from 'react';

interface ChessCellProps {
  piece: string | null | { [key: string]: any };  // 'piece' puede ser string, null o un objeto
  isDark: boolean;
  styles: React.CSSProperties;
}

const ChessCell: React.FC<ChessCellProps> = ({ piece, isDark, styles }) => {
  // Asegúrate de que 'piece' no sea null antes de acceder a 'id'
  const pieceContent = piece && typeof piece === 'object' ? piece.id : piece; 

  return (
    <div
      style={{
        ...styles,
        backgroundColor: isDark ? '#444' : '#888',
        color: pieceContent ? '#fff' : '#f9f9f9',
        fontSize: '12px', // Tamaño de la letra pequeño para las piezas
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '50px',  // Ajusta el tamaño de la celda
        width: '50px',   // Ajusta el tamaño de la celda
      }}
    >
      {pieceContent || ''} {/* Si no hay pieza, no mostrar nada */}
    </div>
  );
};

export default ChessCell;
