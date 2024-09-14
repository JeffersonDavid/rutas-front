'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { ChessBoardStyles, defaultStyles } from './ChessBoardStyles';
import { useFetchBoardData } from './useFetchBoardData';
import ChessCell from './ChessCell';

interface ChessBoardProps {
  apiUrl: string;
  fetchBoardData?: (url: string, token?: string) => Promise<{
    board: (string | null)[][],
    white_player_id: number,
    black_player_id: number
  } | null>;
  styles?: ChessBoardStyles;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  apiUrl,
  fetchBoardData = useFetchBoardData,
  styles = defaultStyles,
}) => {
  const { authToken, user } = useAuth();
  const userId = user.id;
  const [board, setBoard] = useState<(string | null)[][] | null>(null);
  const [isPlayerWhite, setIsPlayerWhite] = useState<boolean | null>(null);

  useEffect(() => {
    const loadBoard = async () => {

      const boardData = await fetchBoardData(apiUrl, authToken);

      console.log('leyend board....')
      console.log(boardData)

      if (boardData && 'white_player_id' in boardData && 'black_player_id' in boardData) {
        // Determina si el jugador es blanco o negro comparando el userId
        if (boardData.white_player_id === userId) {
          setIsPlayerWhite(true);
        } else if (boardData.black_player_id === userId) {
          setIsPlayerWhite(false);
        }

        // Si el jugador es negro, invertimos el tablero
        if (boardData.black_player_id === userId) {
          setBoard(boardData.board.reverse().map((row) => row.reverse()));
        } else {
          setBoard(boardData.board);
        }
      }
    };

    loadBoard();
  }, [apiUrl, authToken, fetchBoardData, userId]);

  if (!board) {
    return <div>Loading board...</div>;
  }

  return (
    <div style={{ ...defaultStyles.boardContainer, ...styles.boardContainer }}>
      <div style={{ ...defaultStyles.board, ...styles.board }}>
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <ChessCell
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isDark={(rowIndex + colIndex) % 2 === 0}
              styles={styles.cell}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
