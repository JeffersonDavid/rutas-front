import { useState, useEffect, useRef } from 'react';
import io, { Socket } from 'socket.io-client';
import { setCookie } from '@/app/appContexts/Auth/Utils';

// Definimos el tipo de los datos que esperamos recibir
interface PlayData {
  payload: {
    game_room_id: string;
  };
}

export const useWebSocket = (userId: number) => {
  
  const [socketGame, setSocketGame] = useState<PlayData | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!socketRef.current) {
      // Inicializamos el socket solo si aún no está conectado
      socketRef.current = io('http://localhost:4000', {
        query: { user_id: userId },
      });

      // Listener para el evento 'play'
      socketRef.current.on('play', (data: PlayData) => {
        console.log('Received play data from socket', data);
        setSocketGame(data);
        setRoomId(data.payload.game_room_id);  // Set roomId when the play event is received
        setCookie('game_room', data.payload.game_room_id); // Guardamos la cookie
      });

      // Listener para cuando el socket se conecta
      socketRef.current.on('connected', (data: { socketId: string }) => {
        console.log('Socket connected with ID:', data.socketId);
      });
    }

    // Cleanup function to disconnect socket when component is unmounted
    
  }, [userId]);

  const emitPlayEvent = () => {
    if (socketRef.current) {
      console.log('Emitiendo mensaje a websocket...');
      socketRef.current.emit('play', { user_id: userId });
    }
  };

  return { socketGame, roomId, emitPlayEvent };
};
