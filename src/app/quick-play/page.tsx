'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/app/appContexts/Auth/AuthContext';
import { fetchData } from '../components/auth/dataCript';
import { useWebSocket } from './hooks/useWebSocket';
import SearchButton from './SearchButton';
import SearchingIndicator from './SearchingIndicator';
import ChessBoard from '../core/game/ChessComponents/board/ChessBoard';
import { getCookie } from '../appContexts/Auth/Utils';

// Custom Hook for managing game room logic
const useGameRoom = (authToken: string) => {
  const [isSearching, setIsSearching] = useState(false);
  const [roomId, setRoomId] = useState<string | null>(null);

  // Check cookie for existing roomId on component mount
  useEffect(() => {
    const cookieRoomId = getCookie('game_room');
    console.log('Cookie roomId:', cookieRoomId); // <-- Debugging output
    if (cookieRoomId) {
      setRoomId(cookieRoomId); // Set roomId from cookie
      setIsSearching(false);   // Stop searching if roomId is found
    } else {
      console.log('No roomId found in cookies');
    }
  }, []);

  const createRoom = async () => {
    setIsSearching(true);
    const create_room = await fetchData('http://localhost/api/quick-game/rooms', { data: null }, authToken);
    // Handle room creation logic (if needed)
  };

  return { isSearching, setIsSearching, roomId, setRoomId, createRoom };
};

const QuickPlay: React.FC = () => {
  const { authToken, user: { id: userId } } = useAuth();
  const { roomId: socketRoomId, emitPlayEvent } = useWebSocket(userId);
  const { isSearching, setIsSearching, roomId, setRoomId, createRoom } = useGameRoom(authToken);

  // Start the WebSocket play event when searching for a game
  const handleCreateRoom = async () => {
    await createRoom();  // Create the room
    emitPlayEvent();     // Emit play event to WebSocket
  };

  // Update roomId if it's received from the WebSocket
  useEffect(() => {
    if (socketRoomId) {
      console.log('Setting roomId from WebSocket:', socketRoomId);
      setRoomId(socketRoomId);
    }
  }, [socketRoomId, setRoomId]);

  // Cuando el roomId esté disponible, desactivamos la búsqueda
  useEffect(() => {
    if (roomId) {
      console.log('RoomId found, stopping search');
      setIsSearching(false); // Cuando hay roomId, desactiva el estado de búsqueda
    }
  }, [roomId, setIsSearching]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-900">
      {!roomId && !isSearching && (
        <SearchButton onClick={handleCreateRoom} />
      )}

      {isSearching && <SearchingIndicator />} {/* Mostrar indicador mientras se busca */}

      {roomId && (
        <div className="flex justify-center items-center">

        
          {
            <ChessBoard apiUrl={`http://localhost/api/quick-game/boardstate/${roomId}`} />
          }

         

        </div>
      )}
    </div>
  );
};

export default QuickPlay;
