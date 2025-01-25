import { useEffect, useState } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import {  setCookie } from '../../../../../appContexts/Auth/Utils';
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
        const expiryDate = new Date();
        expiryDate.setHours(expiryDate.getHours() + 4);
        setCookie('players_roles', JSON.stringify({white:white_player_id, black:black_player_id}), {
          path: '/',
          expires: expiryDate,
          secure: true,
          sameSite: 'Lax',
        });

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
