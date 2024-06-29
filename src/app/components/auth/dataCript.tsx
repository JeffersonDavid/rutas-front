import { UserData } from '../../appContexts/AuthContext';

interface JsonRequest {
  data: string | null;
}

export interface ApiResponse {
  status: number;
  headers: HeadersInit;
  body: any;
  error?: string;
}
export interface UserResponse {
  token: string;
  user_data: {
    id: number;
    name: string;
    email: string;
  };
}

export const rest_authentication = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const dataBase64 = btoa(JSON.stringify(userData));
    const restToken: ApiResponse = await fetchData('http://localhost/api/login', { data: dataBase64 });

    if (restToken.status === 200 && restToken.body && (restToken.body as UserResponse).token) {
      const userResponse = restToken.body as UserResponse;
      console.log(userResponse);
      return {
        ...restToken,
        body: {
          user_data: {
            id: userResponse.user_data.id,
            name: userResponse.user_data.name,
            email: userResponse.user_data.email,
            token: userResponse.token,
          }
        }
      };
    } else {
      return {
        ...restToken,
        error: 'Token not found in response',
      };
    }
  } catch (error: any) {
    return {
      status: 500,
      headers: {},
      body: null,
      error: `Error during authentication: ${error.message}`,
    };
  }
};

export const rest_logout = async (token: string): Promise<ApiResponse> => {
  try {
    const restToken = await fetchData('http://localhost/api/logout', { data: null }, token);

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

export async function fetchData(url: string, data: JsonRequest, token?: string): Promise<ApiResponse> {
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
