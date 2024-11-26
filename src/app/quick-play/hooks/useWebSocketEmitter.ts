import { useWebSocket } from "@/app/appContexts/WebsocketContext";

export const useWebSocketEmitter = () => {
  const { socket } = useWebSocket();

  const emitMessage = (event: string, data: any) => {
    if (!socket) {
      console.error('WebSocket is not connected');
      return;
    }
    socket.emit(event, data);
  };

  return emitMessage;
};
