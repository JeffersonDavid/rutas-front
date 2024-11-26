import { Piece } from '../../cell/ChessCell';
import { useWebSocketEmitter } from '@/app/quick-play/hooks/useWebSocketEmitter';



export const useMovePiece = () => {
  const emitMessage = useWebSocketEmitter(); // Hook dentro de un hook

  const movePiece = async (
    board: (string | Piece | null)[][],
    from: { row: number; col: number },
    to: { row: number; col: number },
    selectedPiece: Piece | null,
    player_role: string,
    player_id: number
  ): Promise<(string | Piece | null)[][]> => {
    emitMessage('movePiece', { from, to, player_role, player_id });

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

  return { movePiece };
};
