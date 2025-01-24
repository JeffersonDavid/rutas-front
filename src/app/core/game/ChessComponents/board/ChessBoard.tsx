'use client';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { ChessBoardStyles, defaultStyles } from './utils/ChessBoardStyles';
import { useFetchBoardData } from './utils/useFetchBoardData';
import ChessCell, { Piece } from '../cell/ChessCell';
import { useMovePiece } from './utils/useMovePiece';
import { useWebSocket } from "@/app/WebSocketContextv1";

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
  const { movePiece } = useMovePiece();
  const { socket } = useWebSocket();

  const userId = user.id;

  const [board, setBoard] = useState<(string | Piece | null)[][] | null>(null);
  const [playerRole, setPlayerRole] = useState<'white' | 'black' | 'spectator'>('spectator');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [players, setPlayers] = useState<number[]>([]);
  const [turns, setTurns] = useState<{ player_id: number; player_role: string }[]>([]);

  // Carga inicial del tablero y rol del jugador
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

  // Listener para el evento `movePiece` en WebSocket
  useEffect(() => {
    if (!socket) {
      console.warn('WebSocket no está conectado');
      return;
    }

    const handleMovePiece = (nboard: (string | Piece | null)[][]) => {
      console.log('Tablero actualizado recibido:', nboard);
      setBoard(nboard.board);
      setTurns(nboard.turns);
    };

    socket.on('movePiece', handleMovePiece);

    return () => {
      socket.off('movePiece', handleMovePiece);
    };
  }, [socket]);

  // Maneja el clic en una celda
  const handleCellClick = useCallback(
    async (rowIndex: number, colIndex: number) => {
      if (!board || !playerRole || !userId) return;

      if (!selectedCell) {
        const clickedPiece = board[rowIndex][colIndex];

        if (
          clickedPiece &&
          typeof clickedPiece === 'object' &&
          clickedPiece.color === playerRole
        ) {
          setSelectedCell({ row: rowIndex, col: colIndex });
        } else {
          console.warn('No puedes seleccionar esta celda');
        }
        return;
      }

      const from = selectedCell;
      const to = { row: rowIndex, col: colIndex };
      const selectedPiece = board[selectedCell.row][selectedCell.col];

      if (typeof selectedPiece !== 'object' || selectedPiece === null) {
        console.error('La celda seleccionada no contiene una pieza válida');
        return;
      }

      try {
        movePiece(board, from, to, selectedPiece, playerRole, userId, players, turns);
        setSelectedCell(null);
      } catch (error) {
        console.error('Error al mover la pieza:', error);
      }
    },
    [board, selectedCell, playerRole, userId, movePiece, players]
  );

  // Renderiza el tablero
  const renderedBoard = useMemo(() => {
    return board?.map((row, rowIndex) =>
      row.map((piece, colIndex) => (
        <MemoizedChessCell
          key={`${rowIndex}-${colIndex}`}
          piece={piece}
          isDark={(rowIndex + colIndex) % 2 === 0}
          isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
          onClick={() => handleCellClick(rowIndex, colIndex)}
          styles={{
            ...styles?.cell,
            transform: playerRole === 'black' ? 'rotate(180deg)' : undefined, // Rotar las celdas para jugador negro
          }}
        />
      ))
    );
  }, [board, selectedCell, styles, handleCellClick, playerRole]);

  return (
    <div
      style={{
        ...defaultStyles.boardContainer,
        ...styles.boardContainer,
        transform: playerRole === 'black' ? 'rotate(180deg)' : undefined, // Rotar tablero completo para jugador negro
      }}
    >
      {board ? (
        <div
          style={{
            ...defaultStyles.board,
            ...styles.board,
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 50px)',
            gridTemplateRows: 'repeat(8, 50px)',
          }}
        >
          {renderedBoard}
        </div>
      ) : (
        <div>Cargando tablero...</div>
      )}
    </div>
  );
};

const MemoizedChessCell = React.memo(ChessCell);

export default ChessBoard;
