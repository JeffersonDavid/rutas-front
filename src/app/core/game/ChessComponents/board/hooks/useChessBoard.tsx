import { useEffect, useState } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { useFetchBoardData } from './useFetchBoardData';
import { Piece } from '../../cell/ChessCell';

export const useBoardData = (apiUrl: string, fetchBoardData: any) => {
  const { authToken, user } = useAuth();
  const userId = user.id;

  const [board, setBoard] = useState<(string | Piece | null)[][] | null>(null);
  const [playerRole, setPlayerRole] = useState<'white' | 'black' | 'spectator'>('spectator');
  const [players, setPlayers] = useState<number[]>([]);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const boardData = await fetchBoardData(apiUrl, authToken);
        if (!boardData) return;

        const { board, white_player_id, black_player_id } = boardData;
        setPlayers([white_player_id, black_player_id]);
        setPlayerRole(
          userId === white_player_id ? 'white' : userId === black_player_id ? 'black' : 'spectator'
        );
        setBoard(board);
      } catch (error) {
        console.error('Error loading board:', error);
      }
    };

    loadBoard();
  }, [apiUrl, authToken, fetchBoardData, userId]);

  return { board, setBoard, playerRole, players };
};
