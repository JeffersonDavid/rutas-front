'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { fetchData } from '../components/auth/dataCript';
import { useWebSocket } from './hooks/useWebSocket';
import SearchButton from './SearchButton';
import SearchingIndicator from './SearchingIndicator';
import RealTimeDataDisplay from './RealTimeDataDisplay';
import ChessBoard from '../core/game/ChessComponents/board/ChessBoard';
import { getCookie } from '../appContexts/Auth/Utils';

const QuickPlay: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [shouldShowRealTimeBox, setShouldShowRealTimeBox] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);
  const { authToken, user } = useAuth();
  const userId = user.id;
  const { realTimeData, emitPlayEvent } = useWebSocket(userId);

  // Verifica si existe la cookie 'game_room' al cargar el componente
  useEffect(() => {
    const cookieRoomId = getCookie('game_room');
    if (cookieRoomId) {
      setRoomId(cookieRoomId);
      setShouldShowRealTimeBox(true);
    }
  }, []);

  // Monitorea el cambio de realTimeData para actualizar el roomId y mostrar la caja de datos en tiempo real
  useEffect(() => {
    if (realTimeData?.room_id) {
      setRoomId(realTimeData.room_id);
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
      {shouldShowRealTimeBox && roomId ? (
        <RealTimeBox roomId={roomId} />
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

// Componente separado para la caja que contiene el tablero de ajedrez
const RealTimeBox: React.FC<{ roomId: string }> = ({ roomId }) => {
  return (
    <div className="flex justify-center items-center">
      <ChessBoard apiUrl={`http://localhost/api/quick-game/boardstate/${roomId}`} />
    </div>
  );
};

export default QuickPlay;
