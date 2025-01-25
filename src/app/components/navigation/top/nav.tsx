import React, { useState } from 'react';
import { FaBell, FaEnvelope, FaList, FaMoon, FaUser, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Dropdown from '../dropdown';
import { useAuthHandler } from './hooks/useAuthHandler';

const NavComponent: React.FC<{ isCollapsed: boolean }> = ({ isCollapsed }) => {
  const { handleLogout, user_is_logged, user } = useAuthHandler();
  const [isTopBarCollapsed, setIsTopBarCollapsed] = useState(false);

  const toggleTopBar = () => {
    setIsTopBarCollapsed((prev) => !prev);
  };

  return (
    <nav
      className={`bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700 w-full transition-all duration-300 ${
        isTopBarCollapsed ? 'h-12' : 'h-16'
      }`}
    >
      <div className="flex items-center">
        <button onClick={() => {}} className="text-gray-300 hover:text-white px-2 py-1 focus:outline-none md:hidden">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
        <span className="text-white text-2xl font-semibold ml-2">
          XChess ({user_is_logged ? user.name : null})
        </span>
      </div>

      <button
        onClick={toggleTopBar}
        className="text-gray-300 hover:text-white px-2 py-1 focus:outline-none"
      >
        {isTopBarCollapsed ? <FaChevronDown /> : <FaChevronUp />}
      </button>

      {user_is_logged && (
        <div
          className={`flex items-center space-x-4 options-container transition-opacity duration-300 ${
            isTopBarCollapsed ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          <FaBell className="text-gray-300 hover:text-white cursor-pointer hidden sm:block" />
          <FaList className="text-gray-300 hover:text-white cursor-pointer hidden sm:block" />
          <FaEnvelope className="text-gray-300 hover:text-white cursor-pointer hidden sm:block" />
          <FaMoon className="text-gray-300 hover:text-white cursor-pointer hidden sm:block" />
          <Dropdown
            options={[
              <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Profile</a>,
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Logout</button>,
            ]}
            title={<FaUser className="text-gray-300 hover:text-white cursor-pointer" />}
          />
        </div>
      )}
    </nav>
  );
};

export default NavComponent;
