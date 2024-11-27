import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";
import { useAuth } from "./Auth/AuthContext";

// Define una variable compartida para la conexión WebSocket
let socketInstance: Socket | null = null;

interface WebSocketContextType {
  socket: Socket | null;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const { authToken } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socketInstance) {
      // Crea una nueva conexión si no existe
      socketInstance = io("http://localhost:4000");

      socketInstance.on("connect", () => {
        console.log("Conectado al WebSocket con ID V000000000000000:", socketInstance!.id);
        socketInstance!.emit("setUserState", authToken);
      });

    }

    // Reutiliza la conexión existente
    setSocket(socketInstance);

    return () => {
      // No desconectes la conexión compartida automáticamente
      // Solo limpia el estado local
      setSocket(null);
    };
  }, [authToken]);

  return (
    <WebSocketContext.Provider value={{ socket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};
