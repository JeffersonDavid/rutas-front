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
