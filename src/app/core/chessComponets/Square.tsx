import React from 'react';
import styles from './Square.module.css';

interface SquareProps {
  isDark: boolean;
}

const Square: React.FC<SquareProps> = ({ isDark }) => {
  const classes: string = isDark ? `${styles.square} ${styles.dark}` : styles.square;
  return <div className={classes} />;
};

export default Square;
