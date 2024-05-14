import React from 'react';
import Square from './Square';
import styles from './ChessBoard.module.css';

const ChessBoard: React.FC = () => {
  const renderSquare = (i: number): JSX.Element => {
    const isDark: boolean = (i + Math.floor(i / 8)) % 2 === 0;
    return <Square key={i} isDark={isDark} />;
  };

  const squares: JSX.Element[] = [];
  for (let i = 0; i < 64; i++) {
    squares.push(renderSquare(i));
  }

  return <div className={styles.board}>{squares}</div>;
};

export default ChessBoard;
