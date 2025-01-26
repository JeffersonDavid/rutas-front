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
    height: '', // Mantiene el tablero centrado verticalmente
  },
  board: {
    display: 'grid',
    gridTemplateColumns: 'repeat(8, 100px)', // Incrementa el tamaño de las celdas
    gridTemplateRows: 'repeat(8, 100px)', // Incrementa el tamaño de las celdas
    boxShadow: '0 0 15px rgba(0, 0, 0, 0.5)',
    border: '5px solid #333',
  },
  cell: {
    width: '100px', // Tamaño de las celdas más grande
    height: '100px', // Tamaño de las celdas más grande
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '36px', // Ajusta el tamaño de la fuente si es necesario
    fontWeight: 'bold',
  },
};

