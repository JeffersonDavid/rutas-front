
'use client'
import { Inter } from "next/font/google";
import "./globals.css";
import NavComponent from './components/navigation/top/nav';
import { AuthProvider, useAuth } from "./appContexts/Auth/AuthContext";
import { LoaderProvider } from "./appContexts/AppLoader";
import { WebSocketProvider } from "./appContexts/WebsocketContext";
import VerticalNavComponent from "./components/navigation/vertical/verticalNav";
import { useState } from 'react';

import { WebSocketProvider as WebSocketProviderv1 }  from "@/app/WebSocketContextv1";

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
        <body className="flex h-screen m-0 p-0 overflow-hidden">
          <LoaderProvider>
            <WebSocketProvider>
              <WebSocketProviderv1 url="http://localhost:4000">
              <VerticalNavComponent isCollapsed={isCollapsed} toggleMenu={toggleMenu} />
              <div className={`flex-1 flex flex-col transition-all duration-300 ${isCollapsed ? 'ml-20' : 'ml-56'}`}>
                <NavComponent isCollapsed={isCollapsed} />
                <main className="flex-1 bg-gray-900 p-4 overflow-auto">
                  {children}
                </main>
              </div>
              </WebSocketProviderv1>
            </WebSocketProvider>
          </LoaderProvider>
        </body>
      </AuthProvider>
    </html>
  );
}
