import Link from 'next/link';
import React, { useState } from 'react';
import {appPrettyBorder,appText,appHover} from '../coreStyles/coreStyles'

interface HoverLinkProps {
  href: string;
  children: React.ReactNode;
}

const LinkNav: React.FC<HoverLinkProps> = ({ href, children }) => {
  const [hover, setHover] = useState(false);

  const handleHover = () => {
    setHover(true);
  };

  const handleLeave = () => {
    setHover(false);
  };

  return (
    <Link
      href={href}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      onClick={handleHover} // Mantener activado el hover cuando se hace clic
      className={`${appText} ${appHover}`}>
      {children}
    </Link>
  );
};

export default LinkNav;
