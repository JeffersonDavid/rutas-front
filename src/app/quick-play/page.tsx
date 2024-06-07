'use client';
import { useState, useEffect } from 'react';
import { useWebSocket } from '../appContexts/WebsocketContext';
import { useAuth } from '@/app/appContexts/AuthContext';

const QuickPlay: React.FC = () => {

  const [searching, setSearching] = useState(false);

  const handleSearchClick = () => {
    setSearching(true);
    // Aquí puedes agregar lógica adicional para manejar la búsqueda de partida, por ejemplo, emitir un evento WebSocket.
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
    </div>
  );
};

export default QuickPlay;
