'use client';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { ChessBoardStyles, defaultStyles } from './ChessBoardStyles';
import { useFetchBoardData } from './useFetchBoardData';
import ChessCell from './ChessCell';
import { Piece } from './ChessCell';
import { movePiece } from './boardUtils' // Importamos la función de movimiento

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
  const userId = user.id;
  const [board, setBoard] = useState<(string | Piece | null)[][] | null>(null);
  const [isPlayerWhite, setIsPlayerWhite] = useState<boolean | null>(null);

  // Estado para rastrear la celda seleccionada (inicio)
  const [selectedCell, setSelectedCell] = useState<{ row: number, col: number } | null>(null);

  // Estado para rastrear si la pieza ha sido seleccionada para mover
  const [selectedPiece, setSelectedPiece] = useState<Piece | null>(null);

  useEffect(() => {
    const loadBoard = async () => {
      const boardData = await fetchBoardData(apiUrl, authToken);

      if (boardData && 'white_player_id' in boardData && 'black_player_id' in boardData) {
        if (boardData.white_player_id === userId) {
          setIsPlayerWhite(true);
        } else if (boardData.black_player_id === userId) {
          setIsPlayerWhite(false);
        }

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

  // Manejador de clic para seleccionar y mover una pieza
  const handleCellClick = (rowIndex: number, colIndex: number) => {
    const pieceAtCell = board[rowIndex][colIndex]; // Pieza en la celda actual

    if (selectedPiece && selectedCell) {
      // Usamos la función movePiece para mover la pieza
      const newBoard = movePiece(board, selectedCell, { row: rowIndex, col: colIndex }, selectedPiece);

      // Actualizamos el estado del tablero
      setBoard(newBoard);

      // Limpiar la selección
      setSelectedPiece(null);
      setSelectedCell(null);
    } else if (pieceAtCell && typeof pieceAtCell === 'object') {
      // Si no hay pieza seleccionada y hacemos clic en una pieza, seleccionamos esa pieza
      setSelectedPiece(pieceAtCell as Piece); // Establecemos la pieza seleccionada
      setSelectedCell({ row: rowIndex, col: colIndex }); // Establecemos la celda seleccionada
    }
  };

  return (
    <div style={{ ...defaultStyles.boardContainer, ...styles.boardContainer }}>
      <div
        style={{
          ...defaultStyles.board,
          ...styles.board,
          display: 'grid',
          gridTemplateColumns: 'repeat(8, 50px)', // 8 columnas de 50px cada una
          gridTemplateRows: 'repeat(8, 50px)',    // 8 filas de 50px cada una
          gap: '0px',  // Ajusta la separación entre las celdas a 0
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((piece, colIndex) => (
            <ChessCell
              key={`${rowIndex}-${colIndex}`}
              piece={piece}
              isDark={(rowIndex + colIndex) % 2 === 0}
              isSelected={selectedCell?.row === rowIndex && selectedCell?.col === colIndex}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              styles={styles.cell}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default ChessBoard;
