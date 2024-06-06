'use client';
import React from 'react';
import { useAuth } from '../../appContexts/AuthContext';
import {
  FaTh,
  FaXRay,
  FaPenNib,
  FaShapes,
  FaToggleOn,
  FaWpforms,
  FaStamp,
  FaBell,
  FaThLarge,
  FaCalendarAlt,
  FaChess,
  FaBars
} from 'react-icons/fa';

interface VerticalNavComponentProps {
  isCollapsed: boolean;
  toggleMenu: () => void;
}

const VerticalNavComponent: React.FC<VerticalNavComponentProps> = ({ isCollapsed, toggleMenu }) => {
  const { authToken } = useAuth();

  return (
    authToken && (
      <nav className={`bg-gray-900 ${isCollapsed ? 'w-20' : 'w-64'} h-screen py-4 px-2 flex flex-col justify-between transition-all duration-300 border-r border-gray-700`}>
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
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}><a href='/dashboard'> Dashboard </a> </span>
            </li>
            <div className="mt-6 text-xs text-gray-400 uppercase px-2">Play</div>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaStamp className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}> <a href='quick-play'> Partida rapida  </a></span>
            </li>

          { /*
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaPenNib className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Typography</span>
            </li>
            <div className="mt-6 text-xs text-gray-400 uppercase px-2">Components</div>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaShapes className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Base</span>
            </li>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaToggleOn className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Buttons</span>
            </li>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaWpforms className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Forms</span>
            </li>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaStar className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Icons</span>
            </li>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaBell className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Notifications</span>
            </li>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaThLarge className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Widgets</span>
              {!isCollapsed && <span className="bg-blue-500 text-xs text-white px-1 py-0.5 ml-2 rounded">NEW</span>}
            </li>
            <div className="mt-6 text-xs text-gray-400 uppercase px-2">Plugins</div>
            <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
              <FaCalendarAlt className="text-xl" />
              <span className={`ml-2 text-lg ${isCollapsed ? 'hidden' : 'block'}`}>Calendar</span>
              {!isCollapsed && <span className="bg-red-500 text-xs text-white px-1 py-0.5 ml-2 rounded">PRO</span>}
            </li>
          */}
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
      </nav>
    )
  );
};

export default VerticalNavComponent;
