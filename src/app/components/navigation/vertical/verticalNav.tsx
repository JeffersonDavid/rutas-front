// VerticalNavComponent.tsx
import React from 'react';
import NavHeader from './NavHeader';
import NavSection from './NavSection';
import NavItem from './NavItem';
import { FaTh, FaStamp, FaChess } from 'react-icons/fa';
import { useAuth } from '../../../appContexts/Auth/AuthContext';

const VerticalNavComponent: React.FC<{ isCollapsed: boolean; toggleMenu: () => void }> = ({ isCollapsed, toggleMenu }) => {
  const { user_is_logged, logout } = useAuth();

  return (
    <nav className={`z-50 bg-gray-900 ${isCollapsed ? 'w-20' : 'w-56'} h-full py-2 px-0 flex flex-col justify-between transition-all duration-300 border-r border-gray-700`}>
      <div>
        <NavHeader isCollapsed={isCollapsed} toggleMenu={toggleMenu} />
        {user_is_logged && (
          <NavSection
            title="Play"
            items={[
              { icon: FaTh, label: 'Dashboard', href: '/dashboard' },
              { icon: FaStamp, label: 'Partida rápida', href: '/quick-play' },
            ]}
            isCollapsed={isCollapsed}
          />
        )}
      </div>
      <div className="px-2 py-2">
        {user_is_logged ? (
          <NavItem icon={FaChess} label="Logout" isCollapsed={isCollapsed} href="#" onClick={logout} />
        ) : (
          <div className="text-center text-white py-2">www.test.com</div>
        )}
      </div>
    </nav>
  );
};

export default VerticalNavComponent;
