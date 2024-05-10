'use client'
import React, { useEffect, useState, ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../appContexts/AuthContext';
import RouteMiddleware from './routeMiddleware';

interface MiddlewareProps {
  children: ReactNode;
}

const Middleware: React.FC<MiddlewareProps> = ({ children }) => {

  const pathname = usePathname();
  const { authToken } = useAuth();
  children = authToken ? children : null
  return <> <RouteMiddleware> {children} </RouteMiddleware>  </>
};

export default Middleware;
