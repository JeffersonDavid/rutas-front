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
import PlayerBar from './components/PlayerBar'

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
    return (
      <div
        style={{
          ...styles.boardContainer,
          flexDirection: playerRole === 'black' ? 'column-reverse' : 'column', // Invierte el orden para jugador negro
        }}
      >
        {board?.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`}
            style={{
              display: 'flex', // Cada fila es un flex container
              flexDirection: playerRole === 'black' ? 'row-reverse' : 'row', // Invierte el orden de las celdas en filas
            }}
          >
            {row.map((piece, colIndex) => (
             
              <div className='cellx'
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                style={{
                  ...styles.cell,
                  backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#ccc' : '#555',
                  cursor: 'pointer',
                }}
              > 
                <ChessCell
                  piece={piece}
                  isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }, [board, selectedCell, handleCellClick, playerRole, styles.cell]);

  if (!board) return <div>Cargando tablero...</div>;

  const top_user_id = getPlayerByRole(playerRole === 'white' ? 'black' : 'white');
  const bottom_user_id = getPlayerByRole(playerRole === 'white' ? 'white' : 'black');

  return (
    <div className="flex flex-col items-center gap-4">
      <PlayerBar player_id={top_user_id} />
      {renderedBoard}
      <PlayerBar player_id={bottom_user_id} />
    </div>
  );
};

export default ChessBoard;
