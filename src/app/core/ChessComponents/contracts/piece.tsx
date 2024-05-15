export interface BasePiece {
  chessPiece: {
    uid:number
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

export function generateRandomInt(): number {
  // Genera un número aleatorio entre 0 (inclusive) y 1 (exclusivo)
  const randomFraction = Math.random();
  // Multiplica el número aleatorio por 100000 para obtener un número en el rango de 0 a 99999
  const randomNumber = Math.floor(randomFraction * 100000);
  return randomNumber;
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
      uid:generateRandomInt(),
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
