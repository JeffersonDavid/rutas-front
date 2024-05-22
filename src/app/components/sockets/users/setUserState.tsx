'use client'
import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../../appContexts/AuthContext';

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
      socket.emit('setUserState', authToken);
    });

    socket.on('setUserState', (message) => {
        
      console.log(message)
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
