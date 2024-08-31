'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ChessBoardProps {
  apiUrl: string;
}

const ChessBoard: React.FC<ChessBoardProps> = ({ apiUrl }) => {
  const [board, setBoard] = useState<(string | null)[][]>([]);

  useEffect(() => {
    const fetchBoard = async () => {
      try {
        const response = await axios.get(apiUrl);
        setBoard(response.data);
      } catch (error) {
        console.error('Error fetching the chess board:', error);
      }
    };

    fetchBoard();
  }, [apiUrl]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 50px)' }}>
      {board.map((row, rowIndex) => 
        row.map((piece, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: (rowIndex + colIndex) % 2 === 0 ? '#f0d9b5' : '#b58863',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '24px',
            }}
          >
            {piece}
          </div>
        ))
      )}
    </div>
  );
};

export default ChessBoard;
