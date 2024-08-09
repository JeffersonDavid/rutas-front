import React from 'react';
import { IconType } from 'react-icons';

interface NavItemProps {
  icon: IconType;
  label: string;
  isCollapsed: boolean;
  href: string;
  onClick?: () => void; // Añadir la propiedad onClick como opcional
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isCollapsed, href, onClick }) => {
  return (
    <li
      className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer"
      onClick={onClick} // Usar la función onClick si se proporciona
    >
      <Icon className="text-lg" />
      <span className={`ml-2 text-md ${isCollapsed ? 'hidden' : 'block'}`}>
        <a href={href}>{label}</a>
      </span>
    </li>
  );
};

export default NavItem;
