import React, { useEffect, useState } from 'react';
import { FaRegComments } from 'react-icons/fa';
import { useAuth } from "@/app/appContexts/Auth/AuthContext";
import { fetchData } from '@/app/components/auth/dataCript';

interface PlayerBarProps {
  player_id: number | string;
  onChatClick?: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ player_id, onChatClick }) => {
  const { authToken } = useAuth();
  const [playerName, setPlayerName] = useState<string>('Cargando...');

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetchData(
          `http://localhost/api/user/${player_id}`,
          { data: null },
          authToken,
          'GET'
        );

        // Suponiendo que la respuesta tiene el nombre en `data.name`
        setPlayerName(response.body.user_data.name || 'Jugador Desconocido');
      } catch (error) {
        console.error('Error al obtener el nombre del jugador:', error);
        setPlayerName('Error al cargar');
      }
    };

    fetchPlayerData();
  }, [player_id, authToken]);

  return (
    <div className="flex items-center justify-between w-[400px] bg-gray-800 text-white p-2 rounded-md shadow-md">
      <span className="text-lg font-semibold">{playerName}</span>
      <FaRegComments
        className="text-2xl cursor-pointer hover:text-gray-400"
        onClick={onChatClick}
      />
    </div>
  );
};

export default PlayerBar;
