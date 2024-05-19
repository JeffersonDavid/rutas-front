'use client'
import { useEffect, useState } from 'react';

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Crear una nueva conexión WebSocket
    const socket = new WebSocket('ws://localhost:4000/ws');

    // Manejar la conexión abierta
    socket.onopen = () => {
      console.log('Connected to the WebSocket server');
      socket.send('Hello Server!');
    };

    // Manejar los mensajes recibidos
    socket.onmessage = (event) => {
      console.log('Message from server:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Manejar la desconexión
    socket.onclose = () => {
      console.log('Disconnected from the WebSocket server');
    };

    // Guardar la conexión WebSocket en el estado
    setWs(socket);

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = () => {
    if (ws) {
      ws.send(input);
      setInput('');
    }
  };

  return (
    <div>
      <h1>WebSocket Chat</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg}</p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default WebSocketComponent;
