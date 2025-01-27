export interface ChessBoardStyles {
  boardContainer?: React.CSSProperties;
  board?: React.CSSProperties;
  cell?: React.CSSProperties;
}

export const defaultStyles: ChessBoardStyles = {
  boardContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '', // Opcional: Mantener el tablero centrado verticalmente
  },
  cell: {
    width: '60px', // Cambiar ancho de cada celda
    height: '60px', // Cambiar alto de cada celda
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '36px',
    fontWeight: 'bold',
  },
};


