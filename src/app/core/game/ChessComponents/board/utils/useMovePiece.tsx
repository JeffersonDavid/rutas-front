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
    player_id: number,
    players:(number)[]
  ): Promise<(void)> => {

    
    emitMessage('movePiece', { board, from, to, selectedPiece, player_role, player_id, players });
    console.log('** movePiece ejecutado ***')
 

  };

  return { movePiece };
};
