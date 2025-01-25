
import { ChessBoardStyles, defaultStyles } from '../hooks/ChessBoardStyles'
import  { Piece } from '../../cell/ChessCell';

export interface ChessBoardProps {
    apiUrl: string;
    fetchBoardData?: (
      url: string,
      token?: string
    ) => Promise<{
      board: (string | Piece | null)[][];
      white_player_id: number;
      black_player_id: number;
    } | null>;
    styles?: ChessBoardStyles;
  }