'use client'
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../appContexts/AuthContext';

interface AuthData {
  token: string | null;
}

interface PayloadData {
  state: number;
}

interface Data {
  auth: AuthData;
  payload: PayloadData;
}

// Notifica el estado en tiempo real de un usuario
const UserConnection = () => {
  const { authToken } = useAuth();

  useEffect(() => {
    // Crear una nueva conexión socket.io
    const socket: Socket = io('http://localhost:4000');

    // Manejar la conexión abierta
    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
      const data: Data = { auth: { token: authToken }, payload: { state: 1 } };
      socket.emit('setUserState', JSON.stringify(data));
    });

    // Manejar los mensajes recibidos
    socket.on('setUserState', (message: string) => {
      console.log('Message from server:', message);
    });

    // Manejar errores de conexión
    socket.on('connect_error', (err) => {
      console.error('Connection error:', err);
    });

    // Manejar la desconexión
    socket.on('disconnect', () => {
      console.log('Disconnected from the WebSocket server');
    });

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, [authToken]); // Añadimos authToken como dependencia

  // El componente no retorna ningún JSX
  return null;
};

export default UserConnection;
