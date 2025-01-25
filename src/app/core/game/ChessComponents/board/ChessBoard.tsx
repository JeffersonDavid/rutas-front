import React, { useState, useMemo } from 'react';
import { useBoardData } from './hooks/useChessBoard';
import { useBoardWebSocket } from './hooks/useBoardWebSocket';
import { useCellClickHandler } from './hooks/useCellClickHandler';
import ChessCell from '../cell/ChessCell';
import { ChessBoardProps } from './contracts/ChessBoardProps';
import { defaultStyles } from './hooks/ChessBoardStyles';
import { useMovePiece } from './hooks/useMovePiece';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { useFetchBoardData } from './hooks/useFetchBoardData';
import getPlayerByRole from './utils/utils'

const ChessBoard: React.FC<ChessBoardProps> = ({
  apiUrl,
  fetchBoardData = useFetchBoardData,
  styles = defaultStyles,
}) => {
  const { board, setBoard, playerRole, players } = useBoardData(apiUrl, fetchBoardData);
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [turns, setTurns] = useState<{ player_id: number; player_role: string }[]>([]);
  const { movePiece } = useMovePiece();
  const { authToken, user } = useAuth();
  useBoardWebSocket(setBoard, setTurns);

  const handleCellClick = useCellClickHandler(
    board,
    selectedCell,
    setSelectedCell,
    movePiece,
    playerRole,
    user.id,
    players,
    turns
  );

  const renderedBoard = useMemo(() => {
    return board?.map((row, rowIndex) =>
      row.map((piece, colIndex) => (
        <div
          key={`${rowIndex}-${colIndex}`}
          style={{
            transform: playerRole === 'black' ? 'rotate(180deg)' : 'none', // Rotar las celdas si el jugador es negro
          }}
        >
          <ChessCell
            piece={piece}
            isDark={(rowIndex + colIndex) % 2 === 0}
            isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
            onClick={() => handleCellClick(rowIndex, colIndex)}
            styles={styles.cell}
          />
        </div>
      ))
    );
  }, [board, selectedCell, handleCellClick, styles.cell, playerRole]);

  if (!board) return <div>Cargando tablero...</div>;

  // Determinar el lado de cada jugador
  const topText = getPlayerByRole(playerRole === 'white' ? 'black' : 'white');
  const bottomText = getPlayerByRole(playerRole === 'white' ? 'white' : 'black');

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Texto del jugador superior */}
      <div className="text-white text-lg font-semibold">{topText }</div>

      {/* Contenedor del tablero */}
      <div
        className="tablecontainer"
        style={{
          ...styles.boardContainer,
          transform: playerRole === 'black' ? 'rotate(180deg)' : 'none', // Rotar todo el tablero para el jugador negro
        }}
      >
        <div
          style={{
            ...styles.board,
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 50px)',
            gridTemplateRows: 'repeat(8, 50px)',
          }}
        >
          {renderedBoard}
        </div>
      </div>

      {/* Texto del jugador inferior */}
      <div className="text-white text-lg font-semibold">{bottomText }</div>
    </div>
  );
};

export default ChessBoard;
