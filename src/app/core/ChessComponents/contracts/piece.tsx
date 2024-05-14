export interface BasePiece {
  chessPiece: {
    symbol: string;
    name: string;
    description: string;
    selected: boolean; // El atributo selected es opcional
    color: string;
    coords: { 
      row: number | null;
      col: number | null;
    };
  };
}

// Extiende la interfaz base para definir las piezas individuales
export interface IPiece extends BasePiece {
  clone(coords: { row: number | null; col: number | null }): IPiece; // Método para clonar una pieza con coordenadas adicionales
}

// Define una función que crea una nueva pieza con el atributo selected establecido como false por defecto
export function createPiece(
  symbol: string,
  name: string,
  description: string,
  color: 'white' | 'black',
  selected: boolean = false,
  coords: { row: number | null; col: number | null } = { row: null, col: null }, // Establecer un objeto vacío por defecto
): IPiece {
  const piece: IPiece = {
    chessPiece: {
      symbol,
      name,
      description,
      color,
      selected,
      coords
    },
    clone(newCoords: { row: number | null; col: number | null }): IPiece {
      // Crea una copia de la pieza actual y actualiza las coordenadas
      return createPiece(symbol, name, description, color, selected, newCoords);
    }
    
  };

  return piece;
}
