'use client'
// Importa los módulos necesarios
import React, { useState } from 'react';
import Piece from '../piece/piece'; // Importa el componente Piece
import { IPiece, createPiece } from '../contracts/piece'; 

// Define las piezas blancas
export const kingWhite: IPiece = createPiece('♔', 'Rey Blanco', 'El Rey Blanco.', 'white');
export const queenWhite: IPiece = createPiece('♕', 'Reina Blanca', 'La Reina Blanca.', 'white');
export const rookWhite: IPiece = createPiece('♖', 'Torre Blanca', 'La Torre Blanca.', 'white');
export const bishopWhite: IPiece = createPiece('♗', 'Alfil Blanco', 'El Alfil Blanco.', 'white');
export const knightWhite: IPiece = createPiece('♘', 'Caballo Blanco', 'El Caballo Blanco.', 'white');
export const pawnWhite: IPiece = createPiece('♙', 'Peón Blanco', 'El Peón Blanco.', 'white');

// Define las piezas negras
export const kingBlack: IPiece = createPiece('♚', 'Rey Negro', 'El Rey Negro.', 'black');
export const queenBlack: IPiece = createPiece('♛', 'Reina Negra', 'La Reina Negra.', 'black');
export const rookBlack: IPiece = createPiece('♜', 'Torre Negra', 'La Torre Negra.', 'black');
export const bishopBlack: IPiece = createPiece('♝', 'Alfil Negro', 'El Alfil Negro.', 'black');
export const knightBlack: IPiece = createPiece('♞', 'Caballo Negro', 'El Caballo Negro.', 'black');
export const pawnBlack: IPiece = createPiece('♟', 'Peón Negro', 'El Peón Negro.', 'black');

// Definición del componente Chessboard
const Chessboard: React.FC = () => {
  // Definir el estado inicial del tablero y la pieza seleccionada
  const startingBoard: (IPiece | null)[][] = [
    [rookBlack, knightBlack, bishopBlack, queenBlack, kingBlack, bishopBlack, knightBlack, rookBlack],
    [pawnBlack, pawnBlack, pawnBlack, pawnBlack, pawnBlack, pawnBlack, pawnBlack, pawnBlack],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [pawnWhite, pawnWhite, pawnWhite, pawnWhite, pawnWhite, pawnWhite, pawnWhite, pawnWhite],
    [rookWhite, knightWhite, bishopWhite, queenWhite, kingWhite, bishopWhite, knightWhite, rookWhite]
  ];

  const [board, setBoard] = useState<(IPiece | null)[][]>(startingBoard);

  //const [selectedPiece, setSelectedPiece] = useState<{ row: number, col: number } | null>(null);


// Función para manejar el clic en una casilla
const handleSquareClick = (row: number, col: number, piece: IPiece | null): void => {

  const seed_ = piece
  // Hacer una copia del tablero actual
  const newBoard: (IPiece | null)[][] = [...board];

  // Verificar si hay una pieza en la casilla seleccionada
  if (piece !== null) {
    // Verifica si la pieza está seleccionada actualmente
    const isSelected = piece.chessPiece.selected;

    // Calcula el nuevo estado seleccionado
    const newSelectedState = !isSelected;

    // Crea una copia de la pieza actualizada con el nuevo estado seleccionado y las nuevas coordenadas
    const updatedPiece: IPiece = {
      ...piece,
      chessPiece: {
        ...piece.chessPiece,
        selected: newSelectedState,
        coords: {
          row: row,
          col: col
        }
      }
    };

    // Actualizar la casilla seleccionada en la nueva matriz del tablero
    newBoard[row][col] = updatedPiece;
    newBoard.forEach(row => {
      row.forEach(col => {
        if(col?.chessPiece.selected){
          if( col.chessPiece.uid != seed_?.chessPiece.uid ){
               col.chessPiece.selected = false
          }
        }
      });
    });

  }
  
  setBoard(newBoard);
};


  
  // Renderizar el tablero y las piezas
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-160 h-160 border border-gray-800">
        {/* Renderizar las casillas del tablero */}
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="flex">
            {row.map((piece, colIndex) => (
              <div
                key={colIndex}
                className={`w-20 h-20 flex justify-center items-center ${
                  (rowIndex + colIndex) % 2 === 0 ? 'bg-gray-300' : 'bg-gray-500'
                }`}
                onClick={() => handleSquareClick(rowIndex, colIndex, piece)}
              >
                {/* Renderizar la pieza si existe */}
                {piece !== null && (
                  <Piece chessPiece={ piece } />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chessboard;
