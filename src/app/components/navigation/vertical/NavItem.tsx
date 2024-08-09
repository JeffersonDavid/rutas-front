import React from 'react';
import { IconType } from 'react-icons';

interface NavItemProps {
  icon: IconType;
  label: string;
  isCollapsed: boolean;
  href: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon: Icon, label, isCollapsed, href }) => {
  return (
    <li className="flex items-center px-2 py-2 text-gray-300 hover:bg-gray-700 rounded-md cursor-pointer">
      <Icon className="text-lg" />
      <span className={`ml-2 text-md ${isCollapsed ? 'hidden' : 'block'}`}>
        <a href={href}>{label}</a>
      </span>
    </li>
  );
};

export default NavItem;
