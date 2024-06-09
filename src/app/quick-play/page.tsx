'use client';
import React, { useState, useEffect } from 'react';
import { useWebSocket } from '../appContexts/WebsocketContext';
import { useAuth } from '@/app/appContexts/AuthContext';
import { fetchData } from '../components/auth/dataCript';

interface Iplayer {
  user_id: number;
  status: number;
  updated_at: string;
  created_at: string;
  id: number;
}

const QuickPlay: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const { authToken } = useAuth();
  const { socket } = useWebSocket();
  const [realTimeData, setRealTimeData] = useState<any>(null);

  const handleSearchClick = async () => {
    setSearching(true);
    await fetchData('http://localhost/api/quick-game/create-player', { data: null }, authToken);

    // Emit the play event to the server after creating the player
    if (socket) {
      socket.emit('play', { authToken });
      socket.on('play', (data) => {
        console.log('Received play data from socket', data);
        setRealTimeData(data);
      });
    }
  };

  // Clean up WebSocket connection when the component unmounts
  useEffect(() => {
    return () => {
      if (socket) {
        socket.off('play');
      }
    };
  }, [socket]);

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
