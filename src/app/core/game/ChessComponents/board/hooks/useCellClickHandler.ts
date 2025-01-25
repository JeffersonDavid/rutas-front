import { useCallback } from 'react';
import { Piece } from '../../cell/ChessCell';

export const useCellClickHandler = (
  board: (string | Piece | null)[][] | null,
  selectedCell: { row: number; col: number } | null,
  setSelectedCell: (cell: { row: number; col: number } | null) => void,
  movePiece: any,
  playerRole: 'white' | 'black' | 'spectator',
  userId: number,
  players: number[],
  turns: { player_id: number; player_role: string }[]
) => {
  return useCallback(
    async (rowIndex: number, colIndex: number) => {
      if (!board || !playerRole || !userId) return;

      if (!selectedCell) {
        const clickedPiece = board[rowIndex][colIndex];

        if (clickedPiece && typeof clickedPiece === 'object' && clickedPiece.color === playerRole) {
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
    [board, selectedCell, playerRole, userId, movePiece, players, turns]
  );
};
