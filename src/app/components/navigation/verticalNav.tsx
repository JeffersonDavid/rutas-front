'use client'
import React from 'react';
import { useAuth } from '../../appContexts/AuthContext';

export default function VerticalNavComponent(){

  const { authToken } = useAuth()

  return (
    authToken && (
      <nav className="nav2 bg-gray-800 w-64 h-screen py-4 px-2 flex flex-col justify-between">
        <div>
          {/* Logo o título del menú */}
          <div className='border-b border-xs border-gray-700 w-full'>
            <h1 className="text-white text-xl font-bold mb-4">chess.com</h1>
          </div>
          
          {/* Enlaces del menú */}
          <ul className="space-y-2">
            <li>
              
            </li>
          </ul>
        </div>

        <div>
          {/* Otros elementos del menú, como el botón de logout */}
          {/* isAuthenticated &&*/}
        </div>
      </nav>
    )
  );
};


