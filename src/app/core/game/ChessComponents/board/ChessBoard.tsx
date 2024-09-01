'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { ChessBoardStyles, defaultStyles } from './ChessBoardStyles';
import { useFetchBoardData } from './useFetchBoardData';
import ChessCell from './ChessCell';

interface ChessBoardProps {
  apiUrl: string;
  fetchBoardData?: (url: string, token?: string) => Promise<(string | null)[][] | null>;
  styles?: ChessBoardStyles;
}

const ChessBoard: React.FC<ChessBoardProps> = ({
  apiUrl,
  fetchBoardData = useFetchBoardData,
  styles = defaultStyles,
}) => {
  const { authToken } = useAuth();
  const [board, setBoard] = useState<(string | null)[][] | null>(null);

  useEffect(() => {
    const loadBoard = async () => {
      const boardData = await fetchBoardData(apiUrl, authToken);
      setBoard(boardData);
    };

    loadBoard();
  }, [apiUrl, authToken, fetchBoardData]);

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
