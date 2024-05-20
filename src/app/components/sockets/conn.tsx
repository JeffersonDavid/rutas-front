'use client'
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../appContexts/AuthContext';

interface AuthData {
  token: string;
}

interface PayloadData {
  state: number;
}

interface Data {
  auth: AuthData;
  payload: PayloadData;
}


const UserConnection = () => {

  const [message, setMessage] = useState<string>('');
  
  const { authToken } = useAuth()

  useEffect(() => {
    // Crear una nueva conexión socket.io
    const socket: Socket = io('http://localhost:4000');

    // Manejar la conexión abierta
    socket.on('connect', () => {

      console.log('Connected to the WebSocket server');
      const data = { auth:{token:authToken} , payload:{ state :1 } }
      socket.emit('notifyStateToServer', JSON.stringify(data));

    });

    // Manejar los mensajes recibidos
    socket.on('notifyStateToServer', (message: string) => {

      console.log('Message from server:', message);
      setMessage(message);
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
  }, []);

  return (
    <div>
      <h1>WebSocket Client</h1>
      <p>Message from server: {'message'}</p>
    </div>
  );
};

export default UserConnection;
