'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { ChessBoardStyles, defaultStyles } from './utils/ChessBoardStyles';
import { useFetchBoardData } from './utils/useFetchBoardData';
import ChessCell, { Piece } from '../cell/ChessCell';
import { useMovePiece } from './utils/useMovePiece';

interface ChessBoardProps {
  apiUrl: string;
  fetchBoardData?: (
    url: string,
    token?: string
  ) => Promise<{
    board: (string | Piece | null)[][];
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
  const userId = user?.id;

  const [board, setBoard] = useState<(string | Piece | null)[][] | null>(null);
  const [playerRole, setPlayerRole] = useState<'white' | 'black' | 'spectator' | null>(null);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  useEffect(() => {
    const loadBoard = async () => {
      try {
        const boardData = await fetchBoardData(apiUrl, authToken);

        if (boardData) {
          const { board, white_player_id, black_player_id } = boardData;

          // Determinar el rol del usuario usando una variable temporal
          let role: 'white' | 'black' | 'spectator' = 'spectator';
          if (userId === white_player_id) {
            role = 'white';
          } else if (userId === black_player_id) {
            role = 'black';
          }

          console.log('Rol determinado:', role);

          // Actualizar el estado
          setPlayerRole(role);
          setBoard(board);

          // Debug adicional
          console.log('user', user);
          console.log('playerRole', role);
        }
      } catch (error) {
        console.error('Error loading board:', error);
      }
    };

    loadBoard();
  }, [apiUrl, authToken, fetchBoardData, userId]);

  const handleCellClick = useCallback(
    async (rowIndex: number, colIndex: number) => {
      // Lógica para manejar clics en las celdas
    },
    [board, selectedPiece, selectedCell]
  );

  const renderedBoard = useMemo(() => {
    if (!board) return null;

    return board.map((row, rowIndex) =>
      row.map((piece, colIndex) => (
        <MemoizedChessCell
          key={`${rowIndex}-${colIndex}`}
          piece={piece}
          isDark={(rowIndex + colIndex) % 2 === 0}
          isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          styles={styles?.cell ?? {}}
        />
      ))
    );
  }, [board, selectedCell, styles, handleCellClick]);

  if (!board) {
    return <div>Cargando tablero...</div>;
  }

  return (
    <div style={{ ...defaultStyles.boardContainer, ...styles.boardContainer }}>
      <div
        style={{
          ...defaultStyles.board,
          ...styles.board,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 50px)',
          gridTemplateRows: 'repeat(8, 50px)',
          gap: '0px',
        }}
      >
        {renderedBoard}
      </div>
    </div>
  );
};

const MemoizedChessCell = React.memo(ChessCell);

export default ChessBoard;
