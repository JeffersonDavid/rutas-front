
'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import NavComponent from './components/navigation/nav';
import { AuthProvider } from "./appContexts/AuthContext";
import { LoaderProvider } from "./appContexts/AppLoader";
import VerticalNavComponent from "./components/navigation/verticalNav";
import Middleware from "./components/auth/pageMiddleware";
import { useState } from 'react';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMenu = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className}`}>
          <LoaderProvider>
            <Middleware>
              <div className="flex h-screen">
                <VerticalNavComponent isCollapsed={isCollapsed} toggleMenu={toggleMenu} />
                <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-64'}`}>
                  <NavComponent isCollapsed={isCollapsed} />
                  <div className="flex-1 bg-gray-900 p-4 overflow-auto">
                    {children}
                  </div>
                </div>
              </div>
            </Middleware>
          </LoaderProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
