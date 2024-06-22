'use client';
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
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
  const [realTimeData, setRealTimeData] = useState<any>(null);
  const { user } = useAuth();
  let user_ :any = user;

  const socket = io('http://localhost:4000', {
    query: {
      user_id: user_.id,
    },
  });

  useEffect(() => {
    // Set up event listener for the 'play' event
    socket.on('play', (data) => {
      console.log('Received play data from socket:', data);
      setRealTimeData(data);
    });

    // Clean up WebSocket connection when the component unmounts
    return () => {
      //socket.off('play');
      //socket.disconnect();
    };
  }, [socket]);

  const handleSearchClick = async () => {
    setSearching(true);
    const waitingList = await fetchData('http://localhost/api/quick-game/create-player', { data: null }, authToken);
    console.log(waitingList);

    // Emit the play event to the server after creating the player
    if (socket) {
      console.log('entra if socket')
      socket.emit('play', { user_id: user_.id });
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
