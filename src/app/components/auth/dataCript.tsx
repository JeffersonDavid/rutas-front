import { UserData } from '../../appContexts/AuthContext';

interface JsonRequest {
    data: string|null;
}

interface ApiResponse {
    status: number;
    headers: HeadersInit;
    body: any;
    error?: string;
  }

  export const rest_authentication = async (userData: UserData): Promise<string | null> => {

    try {
      const data = JSON.stringify(userData);
      const dataBase64 = btoa(data);
      const restToken = await fetchData('http://localhost:8080/api/login', { data: dataBase64 });
  
      if (restToken.status === 200 && restToken.body && restToken.body.token) {
        return restToken.body.token;
      } else {
        console.error('Token not found in response:', restToken);
        return null;
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return null;
    }

  };

  export const rest_logout = async (token: string): Promise<ApiResponse> => {
    try {
      const restToken = await fetchData('http://localhost:8080/api/logout', { data: null }, token);
  
      if (restToken.status !== 200) {
        throw new Error('Logout failed');
      }
  
      return restToken;
    } catch (error: any) {
      console.error('Error during logout:', error);
  
      return {
        status: 500,
        headers: {},
        body: null,
        error: error.message,
      };
    }
  };


async function fetchData(url: string, data: JsonRequest, token?: string): Promise<ApiResponse> {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
  
    // Añadir el token de autorización si está presente
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
      });
  
      const responseData = await response.json();
  
      return {
        status: response.status,
        headers: response.headers,
        body: responseData,
      };
    } catch (error: any) {
      console.error('Error:', error.message);
  
      return {
        status: 500,
        headers: {},
        body: null,
        error: error.message,
      };
    }
  }
  