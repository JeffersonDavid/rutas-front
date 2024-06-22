'use client'
import io from 'socket.io-client';
import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/app/appContexts/AuthContext';
import { fetchData } from '../components/auth/dataCript';


const QuickPlay: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const { authToken } = useAuth();
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const { user } = useAuth();
  let user_: any = user;

  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = io('http://localhost:4000', {
        query: { user_id: user_.id },
      });

      socketRef.current.on('play', (data:any) => {
        console.log('Received play data from socket', data);
        setRealTimeData(data);
      });

      socketRef.current.on('connected', (data:any) => {
        console.log('Socket connected with ID:', data.socketId);
      });
    }

    // Clean up WebSocket connection when the component unmounts
    return () => {
      if (socketRef.current) {
       // socketRef.current.disconnect();
      }
    };
  }, [user_.id]);

  const handleSearchClick = async () => {
    setSearching(true);
    const waitingList = await fetchData('http://localhost/api/quick-game/create-player', { data: null }, authToken);
    console.log(waitingList);

    if (socketRef.current) {
      socketRef.current.emit('play', { user_id: user_.id });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <button
        className="bg-gray-800 text-white p-4 rounded mb-4 hover:bg-gray-700 transition duration-300"
        onClick={handleSearchClick}
      >
        Buscar partida
      </button>
      {searching && (
        <div className="text-center text-white">
          <p className="bg-gray-800 p-2 rounded animate-pulse">Buscando...</p>
        </div>
      )}
      {realTimeData && (
        <div className="text-white mt-4">
          <p><strong>Real Time Data:</strong></p>
          <pre>{JSON.stringify(realTimeData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QuickPlay;
