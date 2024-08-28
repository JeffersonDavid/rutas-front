'use client';
import React, { useState } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { fetchData } from '../components/auth/dataCript';
import { useWebSocket } from './hooks/useWebSocket';
import SearchButton from './SearchButton';
import SearchingIndicator from './SearchingIndicator';
import RealTimeDataDisplay from './RealTimeDataDisplay';

const QuickPlay: React.FC = () => {
  const [searching, setSearching] = useState(false);
  const { authToken, user } = useAuth();
  const userId = user.id
  const { realTimeData, emitPlayEvent } = useWebSocket(userId);

  const handleSearchClick = async () => {
    setSearching(true);
    const waitingList = await fetchData('http://localhost/api/quick-game/create-player', { data: null }, authToken);
    console.log(waitingList);

    emitPlayEvent();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      <SearchButton onClick={handleSearchClick} />
      {searching && <SearchingIndicator />}
      {realTimeData && <RealTimeDataDisplay data={realTimeData} />}
    </div>
  );
};

export default QuickPlay;
