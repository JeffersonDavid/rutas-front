import { fetchData } from '@/app/components/auth/dataCript';
import { Piece } from '../../cell/ChessCell';

interface BoardResponse {
  board: (string | Piece | null)[][];
  white_player_id: number;
  black_player_id: number;
}


export const useFetchBoardData = async (
  apiUrl: string,
  token?: string
): Promise<BoardResponse | null> => {
  try {
    const response = await fetchData(apiUrl, { data: null }, token, 'GET');
    console.log('Fetch Data Response:::::::::::', response);
    console.log(response.body);

    // Verificar si la respuesta contiene las propiedades correctas
    if (response.status === 200 && response.body && response.body.board && response.body.white_player_id !== undefined && response.body.black_player_id !== undefined) {
      return response.body as BoardResponse; // Forzar la conversión al tipo BoardResponse si es seguro
    } else {
      console.error('Invalid response data:', response);
      return null;
    }
  } catch (error) {
    console.error('Error fetching the chess board:', error);
    return null;
  }
};
