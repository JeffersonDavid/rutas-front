import React from 'react';
import { FaBars } from 'react-icons/fa';

interface NavHeaderProps {
  isCollapsed: boolean;
  toggleMenu: () => void;
}

const NavHeader: React.FC<NavHeaderProps> = ({ isCollapsed, toggleMenu }) => {
  return (
    <div className='flex justify-between items-center px-2 mb-4'>
      <span className={`text-white text-xl font-semibold ${isCollapsed ? 'hidden' : 'block'}`}>Xchess</span>
      <button onClick={toggleMenu} className="text-white">
        <FaBars />
      </button>
    </div>
  );
};

export default NavHeader;
