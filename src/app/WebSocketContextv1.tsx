import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

interface WebSocketContextProps {
  socket: Socket | null;
  sendEvent: (event: string, data: any) => void;
  onEvent: (event: string, callback: (data: any) => void) => void;
}

export const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

// Variable compartida para la instancia del socket
let socketInstance: Socket | null = null;

export const WebSocketProvider: React.FC<{ url: string; options?: any; children: React.ReactNode }> = ({
  url,
  options,
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!socketInstance) {
      // Crea una nueva conexión si no existe
      socketInstance = io(url, options);

      socketInstance.on("connect", () => {
        console.log("Conectado al WebSocket con ID V1111:", socketInstance!.id);
      });

      socketInstance.on("disconnect", () => {
        console.log("WebSocket desconectado");
      });
    }

    // Reutiliza la instancia existente
    setSocket(socketInstance);

    return () => {
      // Desconecta solo si es la última referencia
      if (socketInstance) {
        socketInstance.disconnect();
        socketInstance = null;
      }
    };
  }, [url, options]);

  const sendEvent = (event: string, data: any) => {
    if (socket) {
      socket.emit(event, data);
    }
  };

  const onEvent = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  return (
    <WebSocketContext.Provider value={{ socket, sendEvent, onEvent }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);

  if (!context) {
    throw new Error("useWebSocket debe ser usado dentro de un WebSocketProvider");
  }

  return context;
};
