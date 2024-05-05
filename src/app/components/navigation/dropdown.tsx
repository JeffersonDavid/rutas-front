import React, { useState } from 'react';
import {appPrettyBorder,appText,appHover} from '../coreStyles/coreStyles'

const Dropdown: React.FC<{ options: string[], title: string }> = ({ options , title }) => {

  const [isOpen, setIsOpen] = useState(false);
  const dropdownBorder = appPrettyBorder
  const dropdownText = appText
  const dropDownHover = appHover

  return (
    <div className="relative">
      {/* Botón del dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={ `${dropdownText} ${dropDownHover} block px-3 py-2 rounded-md text-md ${isOpen ? 'bg-gray-700 text-white' : '' }`}
      >
        <div className='flex'>{title} 
          <span role="img" className={`m-2 ${isOpen && 'pulse'}`} aria-label="down arrow" style={{ fontSize: '0.6rem' }}> ▼ </span>
         </div>
      </button>

      {/* Contenido del dropdown */}
      {isOpen && (
        <div className={`absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-md z-10 ${dropdownBorder}`}>
          {/* Elementos del dropdown */}
          {options.map((option, index) => (
            <a
              key={index}
              href="#"
              className={`${dropdownText} ${dropDownHover} block px-4 py-2 bg-gray-800 text-xs`}
            >
              {option}
            </a>
          ))}
        </div>
      )}

       <style jsx>{`
          @keyframes pulse {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.1);
            }
            100% {
              transform: scale(1);
            }
          }
          .pulse {
            animation: pulse 1s infinite;
          }
        `}
        </style>

    </div>
  );
};

export default Dropdown;
