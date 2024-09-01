import React from 'react';

interface ChessCellProps {
  piece: string | null;
  isDark: boolean;
  styles?: React.CSSProperties;
}

const ChessCell: React.FC<ChessCellProps> = ({ piece, isDark, styles }) => {
  return (
    <div
      style={{
        ...styles,
        backgroundColor: isDark ? '#444' : '#888',
        color: piece && piece.toLowerCase() === piece ? '#fff' : '#f9f9f9',
      }}
    >
      {piece}
    </div>
  );
};

export default ChessCell;
