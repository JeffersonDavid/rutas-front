'use client';
import React from 'react';
import { useAuth } from '../../appContexts/Auth/AuthContext';
import { FaTh, FaStamp, FaChess, FaBars } from 'react-icons/fa';

interface VerticalNavComponentProps {
  isCollapsed: boolean;
  toggleMenu: () => void;
}

const VerticalNavComponent: React.FC<VerticalNavComponentProps> = ({ isCollapsed, toggleMenu }) => {
  const { user_is_logged } = useAuth();

  return (
    <nav className={`bg-gray-900 ${isCollapsed ? 'w-20' : 'w-64'} h-screen py-4 px-2 flex flex-col justify-between transition-all duration-300 border-r border-gray-700`}>
      {user_is_logged ? (
        <>
          <div>
            <div className='flex justify-between items-center px-2'>
              <span className={`text-white text-2xl font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>Xchess</span>
              <button onClick={toggleMenu} className="text-white">
                <FaBars />
              </button>
            </div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaTh className="text-xl" />
                <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}><a href='/dashboard'> Dashboard </a></span>
              </li>
              <div className="mt-6 text-xs text-gray-400 uppercase px-2">Play</div>
              <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaStamp className="text-xl" />
                <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}><a href='/quick-play'> Partida rápida </a></span>
              </li>
            </ul>
          </div>
          <div className="px-2 py-4">
            <ul className="space-y-2">
              <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
                <FaChess className="text-xl" />
                <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Logout</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="text-center text-white py-4">www.test.com</div>
      )}
    </nav>
  );
};

export default VerticalNavComponent;
