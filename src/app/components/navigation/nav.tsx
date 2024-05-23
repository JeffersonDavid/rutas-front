'use client';
import React, { useState } from 'react';
import { FaBell, FaList, FaEnvelope, FaLanguage, FaMoon, FaBars, FaSearch, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../appContexts/AuthContext';
import Dropdown from './dropdown';

export default function Navbar() {
  const { authToken, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const navSkeleton = [
    <a href='#' className='linkmenu w-full text-justify block px-3 py-2 rounded-md text-md'>.. </a>,
    <Dropdown key={1} options={[
      <a href='#' className='linkmenu w-full text-justify'>Mi perfil</a>,
      <button onClick={logout} className='w-full text-justify'>Logout</button>
    ]} title={'Mi perfil'} />,
  ];

  return (
    <nav className="bg-gray-900 p-4 border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center">
          <span className="text-white text-2xl font-semibold">COREUI</span>
          <button onClick={() => setIsOpen(!isOpen)} className="text-white ml-4 md:hidden">
            <FaBars />
          </button>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex items-center bg-gray-800 text-gray-400 rounded-md px-4 py-2 ml-4">
          <FaSearch className="mr-2" />
          <input type="text" placeholder="Search..." className="bg-gray-800 focus:outline-none" />
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <FaBell className="text-white relative">
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </FaBell>
          <FaList className="text-white relative">
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </FaList>
          <FaEnvelope className="text-white relative">
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-600 rounded-full"></span>
          </FaEnvelope>
          <FaLanguage className="text-white" />
          <FaMoon className="text-white" />
          <div className="relative">
            <FaUserCircle className="text-white text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)} />
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg overflow-hidden z-20">
                <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">Mi perfil</a>
                <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-700">Logout</button>
              </div>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        {authToken && isOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-gray-900 z-10">
            <div className="px-4 py-2">
              <div className="flex items-center bg-gray-800 text-gray-400 rounded-md px-4 py-2 mb-4">
                <FaSearch className="mr-2" />
                <input type="text" placeholder="Search..." className="bg-gray-800 focus:outline-none" />
              </div>
              {navSkeleton.map((item, index) => (
                <div key={index}>{item}</div>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
