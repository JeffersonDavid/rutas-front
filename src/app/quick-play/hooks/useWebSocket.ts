import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export const useWebSocket = (userId: number) => {
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:4000', {
        query: { user_id: userId },
      });

      socketRef.current.on('play', (data: any) => {
        console.log('Received play data from socket', data);
        setRealTimeData(data);
      });

      socketRef.current.on('connected', (data: any) => {
        console.log('Socket connected with ID:', data.socketId);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  const emitPlayEvent = () => {
    if (socketRef.current) {
      socketRef.current.emit('play', { user_id: userId });
    }
  };

  return { realTimeData, emitPlayEvent };
};
