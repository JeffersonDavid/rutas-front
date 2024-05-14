import React from 'react';
import { IPiece } from '../contracts/piece';

const Piece: React.FC<{ chessPiece: IPiece }> = ({ chessPiece }) => {


  const symbol = chessPiece.chessPiece.symbol
  const color = chessPiece.chessPiece.color;
  const pieceColor = color === 'white' ? 'white' : 'black';

  console.log('clicked piece')
  console.log(chessPiece)

return (
  <div className={`w-full h-full flex justify-center items-center`} style={{ color: pieceColor }}>
    {symbol}
  </div>
);
}

export default Piece;
