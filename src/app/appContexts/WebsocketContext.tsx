import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  log_status: number;
}

interface WebSocketContextType {
  users: User[];
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { authToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket: Socket = io('http://localhost:4000');

    newSocket.on('connect', () => {
      console.log('Connected to the WebSocket server');
      newSocket.emit('setUserState', authToken);
      newSocket.emit('getUsersList', authToken);
    });

    newSocket.on('getUsersList', (data_) => {
      console.log('Received user data from socket');
      const data = data_.data.data;

      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Expected an array but received:', data);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [authToken]);

  return (
    <WebSocketContext.Provider value={{ users, socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
