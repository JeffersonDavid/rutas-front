'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { ChessBoardStyles, defaultStyles } from './ChessBoardStyles';
import { useFetchBoardData } from './useFetchBoardData';
import ChessCell from './ChessCell';

interface ChessBoardProps {
  apiUrl: string;
  fetchBoardData?: (url: string, token?: string) => Promise<{
    board: (string | { [key: string]: any } | null)[][];  // board puede contener strings, objetos o nulls
    white_player_id: number;
    black_player_id: number;
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
  const [board, setBoard] = useState<(string | { [key: string]: any } | null)[][] | null>(null); // board contiene celdas con strings, objetos o null
  const [isPlayerWhite, setIsPlayerWhite] = useState<boolean | null>(null);

  useEffect(() => {
    const loadBoard = async () => {
      const boardData = await fetchBoardData(apiUrl, authToken);

      console.log('leyend board....');
      console.log(boardData);

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
      <div
        style={{
          ...defaultStyles.board,
          ...styles.board,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 50px)', // Ajusta el tablero para que cada celda tenga un ancho de 50px
          gridTemplateRows: 'repeat(8, 50px)',    // Ajusta el tablero para que cada celda tenga una altura de 50px
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <ChessCell
              key={`${rowIndex}-${colIndex}`}
              piece={piece}  // piece puede ser string, objeto o null
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
