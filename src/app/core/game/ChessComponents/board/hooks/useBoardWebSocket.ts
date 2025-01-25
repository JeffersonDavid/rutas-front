import { useEffect } from 'react';
import { useWebSocket } from '@/app/WebSocketContextv1';
import { Piece } from '../../cell/ChessCell';

export const useBoardWebSocket = (
  setBoard: (board: (string | Piece | null)[][]) => void,
  setTurns: (turns: { player_id: number; player_role: string }[]) => void
) => {
  const { socket } = useWebSocket();

  useEffect(() => {
    if (!socket) {
      console.warn('WebSocket no está conectado');
      return;
    }

    const handleMovePiece = (data: { board: (string | Piece | null)[][]; turns: any }) => {
      setBoard(data.board);
      setTurns(data.turns);
    };

    socket.on('movePiece', handleMovePiece);

    return () => {
      socket.off('movePiece', handleMovePiece);
    };
  }, [socket, setBoard, setTurns]);
};
