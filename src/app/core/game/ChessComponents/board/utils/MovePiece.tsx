// boardUtils.ts

import { Piece } from '../../cell/ChessCell';

/**
 * Mueve una pieza en el tablero.
 *
 * @param board - El tablero actual.
 * @param from - La celda de origen (coordenadas { row, col }).
 * @param to - La celda de destino (coordenadas { row, col }).
 * @param selectedPiece - La pieza seleccionada para mover.
 * @returns El nuevo tablero con la pieza movida.
 */
export const movePiece = (
  board: (string | Piece | null)[][],
  from: { row: number, col: number },
  to: { row: number, col: number },
  selectedPiece: Piece | null
): (string | Piece | null)[][] => {

    
  console.log(from)
  console.log(to)
  // Clonar el tablero actual para no mutar el original
  const newBoard = [...board];

  if (selectedPiece) {
    // Mover la pieza seleccionada a la nueva celda
    newBoard[to.row][to.col] = selectedPiece;

    // Limpiar la celda donde estaba la pieza
    newBoard[from.row][from.col] = null;
  }

  return newBoard;
};
