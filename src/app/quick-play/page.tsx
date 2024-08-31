'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { fetchData } from '../components/auth/dataCript';
import { useWebSocket } from './hooks/useWebSocket';
import SearchButton from './SearchButton';
import SearchingIndicator from './SearchingIndicator';
import RealTimeDataDisplay from './RealTimeDataDisplay';
import ChessBoard from '../core/game/ChessComponents/ChessBoard';

const QuickPlay: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [shouldShowRealTimeBox, setShouldShowRealTimeBox] = useState(false);
  const { authToken, user } = useAuth();
  const userId = user.id;
  const { realTimeData, emitPlayEvent } = useWebSocket(userId);

  // Monitorea el cambio de realTimeData para mostrar la caja de datos en tiempo real
  useEffect(() => {
    if (realTimeData) {
      setShouldShowRealTimeBox(true);
    }
  }, [realTimeData]);

  // Maneja la acción cuando el usuario hace clic en el botón de búsqueda
  const handleSearchClick = async () => {
    setIsSearching(true);
    try {
      const waitingList = await fetchData(
        'http://localhost/api/quick-game/rooms',
        { data: null },
        authToken
      );
      console.log('WaitingList created', waitingList);

      // Aquí puedes llamar a emitPlayEvent si es necesario
      // emitPlayEvent();
    } catch (error) {
      console.error('Error creating WaitingList', error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      {shouldShowRealTimeBox ? (
        <RealTimeBox />
      ) : (
        <>
          <SearchButton onClick={handleSearchClick} />
          {isSearching && <SearchingIndicator />}
          {realTimeData && <RealTimeDataDisplay data={realTimeData} />}
        </>
      )}
    </div>
  );
};

// Componente separado para la caja vacía con borde gris
const RealTimeBox: React.FC = () => {
  return (
    <div className="flex justify-center items-center w-1/2 h-1/2 border border-gray-400">
      {/* Caja vacía con borde gris */}
      <ChessBoard apiUrl='http://vmback/api/quick-game/chessboard/state'/>

    </div>
  );
};

export default QuickPlay;
