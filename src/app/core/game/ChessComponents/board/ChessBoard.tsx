'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { ChessBoardStyles, defaultStyles } from './utils/ChessBoardStyles';
import { useFetchBoardData } from './utils/useFetchBoardData';
import ChessCell, { Piece } from '../cell/ChessCell';
import { useMovePiece } from './utils/useMovePiece';

interface ChessBoardProps {
  apiUrl: string;
  fetchBoardData?: (url: string, token?: string) => Promise<{
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
  const { movePiece } = useMovePiece();

  const [gameState, setGameState] = useState<{
    board: (string | Piece | null)[][] | null;
    whitePlayerId: number | null;
    blackPlayerId: number | null;
    isPlayerWhite: boolean | null;
  }>({
    board: null,
    whitePlayerId: null,
    blackPlayerId: null,
    isPlayerWhite: null,
  });

  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  useEffect(() => {
    const loadBoard = async () => {
      const boardData = await fetchBoardData(apiUrl, authToken);
      if (boardData && boardData.white_player_id && boardData.black_player_id) {
        const isPlayerWhite = boardData.white_player_id === userId;
        setGameState({
          board: boardData.board,
          whitePlayerId: boardData.white_player_id,
          blackPlayerId: boardData.black_player_id,
          isPlayerWhite,
        });
      }
    };
    loadBoard();
  }, [apiUrl, authToken, fetchBoardData, userId]);

  // Memoize the handleCellClick function to prevent re-creation on every render
  const handleCellClick = useCallback(
    async (rowIndex: number, colIndex: number) => {
      const isPlayerTurn =
        (gameState.isPlayerWhite && gameState.whitePlayerId === userId) ||
        (!gameState.isPlayerWhite && gameState.blackPlayerId === userId);

      if (!isPlayerTurn) {
        console.log('No es tu turno.');
        return;
      }

      const pieceAtCell = gameState.board ? gameState.board[rowIndex][colIndex] : null;

      if (selectedPiece && selectedCell) {
        const newBoard = await movePiece(
          gameState.board as (string | Piece | null)[][],
          selectedCell,
          { row: rowIndex, col: colIndex },
          selectedPiece
        );

        setGameState((prev) => ({
          ...prev,
          board: newBoard,
        }));

        setSelectedPiece(null);
        setSelectedCell(null);
      } else if (pieceAtCell && typeof pieceAtCell === 'object') {
        setSelectedPiece(pieceAtCell as Piece);
        setSelectedCell({ row: rowIndex, col: colIndex });
      }
    },
    [gameState.board, gameState.isPlayerWhite, gameState.whitePlayerId, gameState.blackPlayerId, selectedPiece, selectedCell, movePiece, userId]
  );

  // Memoize the rendered board for performance
  const renderedBoard = useMemo(() => {
    const boardToRender = gameState.isPlayerWhite
      ? gameState.board
      : gameState.board?.slice().reverse().map((row) => row.slice().reverse());

    return boardToRender?.map((row, rowIndex) =>
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
  }, [gameState.board, gameState.isPlayerWhite, selectedCell, styles, handleCellClick]);

  if (!gameState.board) {
    return <div>Loading board...</div>;
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

// Memoized ChessCell component to prevent unnecessary re-renders
const MemoizedChessCell = React.memo(ChessCell);

export default ChessBoard;
