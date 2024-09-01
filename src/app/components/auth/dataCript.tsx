import axios, { AxiosResponse, AxiosHeaders, Method } from 'axios';
import { UserData } from "@/app/appContexts/Auth/Contracts";

interface JsonRequest {
  data: string | null;
}

export interface ApiResponse {
  status: number;
  headers: any;
  body: any;
  error?: string;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  token: string;
}

// Función para autenticación
export const rest_authentication = async (userData: UserData): Promise<ApiResponse> => {
  try {
    const dataBase64 = btoa(JSON.stringify(userData)); // Convierte los datos del usuario a Base64
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
          body: userResponse, // Devuelve el usuario con el token
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
      headers: {} as AxiosHeaders,
      body: null,
      error: `Error during authentication: ${error.message}`,
    };
  }
};

// Función para logout
export const rest_logout = async (token: string): Promise<ApiResponse> => {
  try {
    const restToken = await fetchData('http://localhost/api/logout', { data: null }, token);

    if (restToken.status !== 200) {
      throw new Error('Logout failed');
    }

    return restToken; // Devuelve la respuesta de logout exitosa
  } catch (error: any) {
    console.error('Error during logout:', error);

    return {
      status: 500,
      headers: {} as AxiosHeaders,
      body: null,
      error: error.message,
    };
  }
};

// Función genérica para hacer peticiones HTTP
export async function fetchData(
  url: string,
  data: JsonRequest,
  token?: string,
  method: Method = 'POST' // Método por defecto es POST
): Promise<ApiResponse> {
  const headers: AxiosHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
  });

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const config = {
      url,
      method,
      headers,
      data: method === 'GET' ? undefined : data, // En caso de GET, no se envía body
      params: method === 'GET' ? data : undefined, // En caso de GET, los datos van como parámetros
    };

    const response: AxiosResponse = await axios(config);
    console.log("Fetch Data Response:", response.data); // Debugging line

    return {
      status: response.status,
      headers: response.headers,
      body: response.data,
    };
  } catch (error: any) {
    console.error('Error:', error.message);
    console.error('Error-response:', error);

    return {
      status: error.response?.status || 500,
      headers: error.response?.headers || {} as AxiosHeaders,
      body: null,
      error: error.message,
    };
  }
}
