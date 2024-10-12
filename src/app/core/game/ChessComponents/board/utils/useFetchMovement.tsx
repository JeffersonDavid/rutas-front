import { fetchData } from '@/app/components/auth/dataCript';
import { getCookie } from '@/app/appContexts/Auth/Utils';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';

export const useFetchMovement = async (
  from: { row: number, col: number },
  to: { row: number, col: number }
): Promise<(boolean)> => {

  const { authToken } = useAuth();
  const cookieRoomId = getCookie('game_room');
  const apiUrl = 'http://vmback/api/piecemovement/'+ cookieRoomId
  const response = await fetchData(apiUrl, { data: null }, authToken, 'POST');

  console.log('response from movement')
  console.log(response)

  return true
 
};
