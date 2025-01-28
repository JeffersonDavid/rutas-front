import React, { useEffect, useState } from 'react';
import { FaRegComments } from 'react-icons/fa';
import { useAuth } from "@/app/appContexts/Auth/AuthContext";
import { fetchData } from '@/app/components/auth/dataCript';

interface PlayerBarProps {
  player_id: number | string;
  turns: { player_id: number; player_role: string }[] | null | undefined; // Acepta null y undefined
  player_role: 'white' | 'black'; // Rol del jugador
}

const PlayerBar: React.FC<PlayerBarProps> = ({ player_id, turns, player_role }) => {
  const { authToken } = useAuth();
  const [playerName, setPlayerName] = useState<string>('Cargando...');
  const [isTurn, setIsTurn] = useState<boolean>(false);

  useEffect(() => {
    const checkTurn = () => {
      if (!turns || turns.length === 0) {
        // 🟢 No hay turnos registrados (primer turno), le toca a las blancas
        setIsTurn(player_role === 'white');
      } else {
        // 🔹 Hay turnos previos, verificar el último turno
        const lastTurn = turns[turns.length - 1];
        setIsTurn(lastTurn.player_id !== player_id); // Si el último en mover no es este jugador, es su turno
      }
    };

    checkTurn();
  }, [turns, player_id, player_role]);

  useEffect(() => {
    const fetchPlayerData = async () => {
      try {
        const response = await fetchData(
          `http://localhost/api/user/${player_id}`,
          { data: null },
          authToken,
          'GET'
        );

        setPlayerName(response.body.user_data.name || 'Jugador Desconocido');
      } catch (error) {
        console.error('Error al obtener el nombre del jugador:', error);
        setPlayerName('Error al cargar');
      }
    };

    fetchPlayerData();
  }, [player_id, authToken]);

  return (
    <div className={`flex items-center justify-between w-[400px] bg-gray-800 text-white p-2 rounded-md shadow-md ${isTurn ? 'border-2 border-yellow-400' : ''}`}>
      <span className={`text-lg font-semibold ${isTurn ? 'text-yellow-400' : ''}`}>
        {playerName}
      </span>
      <FaRegComments className="text-2xl cursor-pointer hover:text-gray-400" />
    </div>
  );
};

export default PlayerBar;
