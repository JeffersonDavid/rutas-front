import { useWebSocket } from "@/app/WebSocketContextv1";

export const useWebSocketEmitter = () => {
  const { socket } = useWebSocket();

  const emitMessage = (event: string, data: any) => {
    if (!socket) {
      console.error("WebSocket no está conectado");
      return;
    }
    socket.emit(event, data);
    console.log(`Evento emitido: ${event}`, data);
  };

  return emitMessage;
};
