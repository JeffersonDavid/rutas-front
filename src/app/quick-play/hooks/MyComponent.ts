import { useWebSocketListener } from "@/hooks/useWebSocketListener";

const MyComponent = () => {
  useWebSocketListener("movePiece", (data) => {
    console.log("Movimiento recibido del servidor:", data);
    // Aquí puedes actualizar el estado o manejar la lógica según el mensaje recibido
  });

  return <div>Escuchando eventos de WebSocket...</div>;
};
