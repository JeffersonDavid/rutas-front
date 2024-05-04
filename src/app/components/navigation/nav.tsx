'use client'
import React, { useState } from 'react';
import Dropdown from './dropdown';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const planing = ['Añadir sitios de entrega','Calcular trayecto']

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-white text-lg font-semibold">Logo</span>
          </div>
          <div className="flex items-center">
            <div className="block md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white px-2 py-1 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
            {/* Contenedor condicional para mostrar los enlaces de navegación solo en dispositivos móviles */}
            {isOpen && (
              <div className="md:hidden absolute top-16 left-0 w-full bg-gray-800 z-10">
                <div className="px-2 pt-2 pb-3 sm:px-3">
                  {/* <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                    Planificador diario
                  </a> */}
                  <Dropdown options={planing} title='Planificador diario' />
                </div>
              </div>
            )}
          </div>
          {/* Contenedor condicional para mostrar los enlaces de navegación solo en escritorio */}
          <div className="hidden md:flex md:items-center">
            {/*  <a href="#" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium">
              Planificador diario
            </a>*/}
           
            <Dropdown options={planing} title='Planificador diario' />
          </div>
        </div>
      </div>
    </nav>
  );
}