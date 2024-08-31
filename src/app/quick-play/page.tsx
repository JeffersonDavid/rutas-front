'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { fetchData } from '../components/auth/dataCript';
import { useWebSocket } from './hooks/useWebSocket';
import SearchButton from './SearchButton';
import SearchingIndicator from './SearchingIndicator';
import RealTimeDataDisplay from './RealTimeDataDisplay';

const QuickPlay: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const [showRealTimeBox, setShowRealTimeBox] = useState(false);
  const { authToken, user } = useAuth();
  const userId = user.id;
  const { realTimeData, emitPlayEvent } = useWebSocket(userId);

  // Detectar el primer mensaje de realTimeData y ocultar todos los elementos de la pantalla
  useEffect(() => {
    if (realTimeData) {
      setShowRealTimeBox(true);
    }
  }, [realTimeData]);

  const handleSearchClick = async () => {
    setSearching(true);
    const waitingList = await fetchData('http://localhost/api/quick-game/create-room', { data: null }, authToken);
    console.log('WaitingList created');
    //emitPlayEvent();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      {showRealTimeBox ? (
        <div className="flex justify-center items-center w-1/2 h-1/2 border border-gray-400">
          {/* Caja vacía con borde gris */}
        </div>
      ) : (
        <>
          <SearchButton onClick={handleSearchClick} />
          {searching && <SearchingIndicator />}
          {realTimeData && <RealTimeDataDisplay data={realTimeData} />}
        </>
      )}
    </div>
  );
};

export default QuickPlay;
