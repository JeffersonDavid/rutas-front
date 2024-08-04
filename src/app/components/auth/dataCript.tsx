import { UserData } from "@/app/appContexts/Auth/Contracts";

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
  id: number;
  name: string;
  email: string;
  token: string;
}

export const rest_authentication = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const dataBase64 = btoa(JSON.stringify(userData));
    const restToken = await fetchData('http://localhost/api/login', { data: dataBase64 });

    if (restToken.status === 200 && restToken.body) {
      console.log("Response Body:", restToken.body); // Debugging line
      const token = restToken.body.token;
      const userData = restToken.body.user_data;
      // Verifica que el token esté presente en la respuesta
      if (token) {
        const userResponse: UserResponse = {
          id: userData.id,
          name: userData.name,
          email: userData.email,
          token: token,
        };

        return {
          ...restToken,
          body: userResponse,
        };
      } else {
        return {
          ...restToken,
          error: 'Token not found in response',
        };
      }
    } else {
      return {
        ...restToken,
        error: 'Invalid authentication response',
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
    console.log("Fetch Data Response:", responseData); // Debugging line

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
