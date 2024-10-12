import { fetchData } from '@/app/components/auth/dataCript';

export const useFetchBoardData = async (
  apiUrl: string,
  token?: string
): Promise<(string | null)[][] | null> => {
  try {
    const response = await fetchData(apiUrl, { data: null }, token, 'GET');
    console.log('Fetch Data Response:::::::::::', response);
    console.log(response.body)
    if (response.status === 200 && response.body && response.body.board) {
      return (response.body);
    } else {
      console.error('Invalid response data:', response);
      return null;
    }
  } catch (error) {
    console.error('Error fetching the chess board:', error);
    return null;
  }
};
