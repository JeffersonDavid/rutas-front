'use client';
import React, { useEffect, useState } from 'react';
import { fetchData } from '@/app/components/auth/dataCript';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';

interface ChessBoardProps {
  apiUrl: string;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ apiUrl }) => {
  const { authToken } = useAuth();

  const [board, setBoard] = useState<(string | null)[][] | null>(null);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await fetchData(apiUrl, { data: null }, authToken, 'GET');
        console.log('Fetch Data Response:', response);
        
        if (response.status === 200 && response.body && response.body.board) {
          const parsedBoard = JSON.parse(response.body.board);
          setBoard(parsedBoard);
        } else {
          console.error('Invalid response data:', response);
        }
      } catch (error) {
        console.error('Error fetching the chess board:', error);
      }
    };

    fetchBoard();
  }, [apiUrl, authToken]);

  if (!board) {
    return <div>Loading board...</div>;
  }

  return (
    <div style={styles.boardContainer}>
      <div style={styles.board}>
        {board.map((row, rowIndex) => 
          row.map((piece, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              style={{
                ...styles.cell,
                backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#444' : '#888',
                color: piece && piece.toLowerCase() === piece ? '#fff' : '#f9f9f9', // White for black pieces, light gray for white pieces
              }}
            >
              {piece}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  boardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 60px)',
    gridTemplateRows: 'repeat(8, 60px)',
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    border: '5px solid #333',
  },
  cell: {
    width: '60px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

export default ChessBoard;
