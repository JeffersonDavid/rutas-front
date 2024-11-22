import { Piece } from '../../cell/ChessCell';
import { useFetchMovement } from './useFetchMovement';

/**
 * Hook personalizado para mover una pieza en el tablero.
 */
export const useMovePiece = () => {
  
  const movePiece = async (
    board: (string | Piece | null)[][],
    from: { row: number, col: number },
    to: { row: number, col: number },
    selectedPiece: Piece | null
  ): Promise<(string | Piece | null)[][]> => {

    const newBoard = [...board];
  
/*
    const moveBackendValidation = await useFetchMovement(from, to);

    // Clonar el tablero actual para no mutar el original
    const newBoard = [...board];

    if (selectedPiece && moveBackendValidation) {
      // Mover la pieza seleccionada a la nueva celda
      newBoard[to.row][to.col] = selectedPiece;

      // Limpiar la celda donde estaba la pieza
      newBoard[from.row][from.col] = null;
    }
*/

    return newBoard;
  };

  return { movePiece };
};
