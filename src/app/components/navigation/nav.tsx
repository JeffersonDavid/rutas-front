'use client';
import React from 'react';
import { FaBell, FaEnvelope, FaList, FaMoon, FaUser } from 'react-icons/fa';
import Dropdown from './dropdown';
import { useAuth } from '../../appContexts/AuthContext';

interface NavComponentProps {
  isCollapsed: boolean;
}

const NavComponent: React.FC<NavComponentProps> = ({ isCollapsed }) => {
  const { logout, user_is_logged, user } = useAuth();

  return (
    <nav className="bg-gray-800 p-4 flex items-center justify-between border-b border-gray-700">
    
          <div className="flex items-center">
            <button
              onClick={() => {}}
              className="text-gray-300 hover:text-white px-2 py-1 focus:outline-none md:hidden"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            <span className="text-white text-2xl font-semibold ml-2">XChess ({ user_is_logged ? user.name : null })</span>
          </div>

          {user_is_logged && (
          <>
          <div className="flex items-center space-x-4 mr-[200pt]">
            <FaBell className="text-gray-300 hover:text-white cursor-pointer" />
            <FaList className="text-gray-300 hover:text-white cursor-pointer" />
            <FaEnvelope className="text-gray-300 hover:text-white cursor-pointer" />
            <FaMoon className="text-gray-300 hover:text-white cursor-pointer" />
            <Dropdown
              options={[
                <a href="#" className="block px-4 py-2 text-sm text-gray-700">Profile</a>,
                <button onClick={logout} className="block px-4 py-2 text-sm text-gray-700">Logout</button>,
              ]}
              title={<FaUser className="text-gray-300 hover:text-white cursor-pointer" />}
            />
          </div>
          </>
        )}
    </nav>
  );
};

export default NavComponent;
