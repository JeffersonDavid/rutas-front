'use client';

import React, { useEffect, useState, FormEvent } from 'react';

interface Message {
  username: string;
  message: string;
}

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [allMessages, setAllMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000//api//socket');
    setWs(socket);

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);
      setAllMessages((prevMessages) => [...prevMessages, data]);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };

    return () => {
      socket.close();
    };
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (ws) {
      const newMessage = { username, message };
      ws.send(JSON.stringify(newMessage));
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat App</h1>
      <h1>Enter a username</h1>

      <input value={username} onChange={(e) => setUsername(e.target.value)} />

      <br />
      <br />

      <div>
        {allMessages.map(({ username, message }, index) => (
          <div key={index}>
            {username}: {message}
          </div>
        ))}

        <br />

        <form onSubmit={handleSubmit}>
          <input
            name="message"
            placeholder="Enter your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
};

export default Home;
