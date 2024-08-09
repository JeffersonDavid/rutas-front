import React from 'react';
import NavItem from './NavItem';
import { IconType } from 'react-icons';

interface NavSectionProps {
  title?: string;
  items: { icon: IconType; label: string; href: string }[];
  isCollapsed: boolean;
}

const NavSection: React.FC<NavSectionProps> = ({ title, items, isCollapsed }) => {
  return (
    <div className="mt-4">
      {title && <div className="text-xs text-gray-400 uppercase px-2">{title}</div>}
      <ul className="mt-2 space-y-1">
        {items.map((item, index) => (
          <NavItem key={index} icon={item.icon} label={item.label} isCollapsed={isCollapsed} href={item.href} />
        ))}
      </ul>
    </div>
  );
};

export default NavSection;
