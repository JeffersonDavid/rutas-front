import React from 'react';
import { FaRegComments } from 'react-icons/fa';

interface PlayerBarProps {
  playerName: string;
  onChatClick?: () => void;
}

const PlayerBar: React.FC<PlayerBarProps> = ({ playerName, onChatClick }) => {
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
