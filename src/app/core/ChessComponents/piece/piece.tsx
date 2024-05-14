import React from 'react';
import { IPiece } from '../contracts/piece';

const Piece: React.FC<{ chessPiece: IPiece }> = ({ chessPiece }) => {
  const color = chessPiece.chessPiece.color;
  const pieceColor = color === 'white' ? 'white' : 'black';

  // Verifica si la pieza está seleccionada
  const isSelected = chessPiece.chessPiece.selected;
  const text = isSelected ? 'sel' : 'no sel'

  return (
    <div className={`w-full h-full flex justify-center items-center`} style={{ color: pieceColor }}>
      {chessPiece.chessPiece.symbol}
      {text}
    </div>
  );
};

export default Piece;
