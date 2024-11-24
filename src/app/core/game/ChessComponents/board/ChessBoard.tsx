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
  const { movePiece } = useMovePiece();

  const userId = user.id;

  const [board, setBoard] = useState<(string | Piece | null)[][] | null>(null);
  const [playerRole, setPlayerRole] = useState<'white' | 'black' | 'spectator'>('spectator');
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);

  // Carga el tablero y determina el rol del usuario
  useEffect(() => {
    const loadBoard = async () => {
      try {
        const boardData = await fetchBoardData(apiUrl, authToken);
        if (!boardData) return;

        const { board, white_player_id, black_player_id } = boardData;
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


  // Maneja el clic en una celda
  const handleCellClick = useCallback(
    async (rowIndex: number, colIndex: number) => {
      if (!board || !playerRole || !userId) return;
  
      // Si no hay una celda seleccionada, selecciona la celda actual
      if (!selectedCell) {
        const clickedPiece = board[rowIndex][colIndex];
  
        // Validar que la celda contiene una pieza y que la pieza pertenece al jugador
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
  
      // Si hay una celda seleccionada, intenta mover la pieza
      const from = selectedCell; // Celda de origen
      const to = { row: rowIndex, col: colIndex }; // Celda de destino
      const selectedPiece = board[selectedCell.row][selectedCell.col];
  
      // Validar que la pieza seleccionada sea del tipo correcto
      if (typeof selectedPiece !== 'object' || selectedPiece === null) {
        console.error('La celda seleccionada no contiene una pieza válida');
        return;
      }
  
      try {
        // Llamar a movePiece con todos los argumentos requeridos
        const updatedBoard = await movePiece(board, from, to, selectedPiece, playerRole, userId);
  
        // Actualizar el estado del tablero y limpiar la celda seleccionada
        setBoard(updatedBoard);
        setSelectedCell(null); // Limpiar la selección después de mover
      } catch (error) {
        console.error('Error al mover la pieza:', error);
      }
    },
    [board, selectedCell, playerRole, userId, movePiece]
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
          styles={styles?.cell}
        />
      ))
    );
  }, [board, selectedCell, styles, handleCellClick]);

  return (
    <div style={{ ...defaultStyles.boardContainer, ...styles.boardContainer }}>
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
