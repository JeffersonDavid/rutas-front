export interface BasePiece {
  chessPiece: {
    symbol: string;
    name: string;
    description: string;
    selected: boolean; // El atributo selected es opcional
    color:string
  };
}

// Extiende la interfaz base para definir las piezas individuales
export interface IPiece extends BasePiece {}

// Define una función que crea una nueva pieza con el atributo selected establecido como false por defecto
export function createPiece(symbol: string, name: string, description: string, color: 'white' | 'black', selected: boolean = false): IPiece {
  return {
    chessPiece: {
      symbol,
      name,
      description,
      selected,
      color
    }
  };
}

/* ejemplo uso
export const kingWhite: IPiece = createPiece('♔', 'Rey Blanco', 'El Rey Blanco.');
export const queenWhite: IPiece = createPiece('♕', 'Reina Blanca', 'La Reina Blanca.');
export const rookWhite: IPiece = createPiece('♖', 'Torre Blanca', 'La Torre Blanca.');
export const bishopWhite: IPiece = createPiece('♗', 'Alfil Blanco', 'El Alfil Blanco.');
export const knightWhite: IPiece = createPiece('♘', 'Caballo Blanco', 'El Caballo Blanco.');
export const pawnWhite: IPiece = createPiece('♙', 'Peón Blanco', 'El Peón Blanco.');
export const kingBlack: IPiece = createPiece('♚', 'Rey Negro', 'El Rey Negro.');
export const queenBlack: IPiece = createPiece('♛', 'Reina Negra', 'La Reina Negra.');
export const rookBlack: IPiece = createPiece('♜', 'Torre Negra', 'La Torre Negra.');
export const bishopBlack: IPiece = createPiece('♝', 'Alfil Negro', 'El Alfil Negro.');
export const knightBlack: IPiece = createPiece('♞', 'Caballo Negro', 'El Caballo Negro.');
export const pawnBlack: IPiece = createPiece('♟', 'Peón Negro', 'El Peón Negro.');
*/