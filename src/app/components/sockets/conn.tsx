'use client'
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const UserConnection = () => {
  
  useEffect(() => {
    // Crear una nueva conexión socket.io
    const socket = io('http://localhost:4000');

    // Manejar la conexión abierta
    socket.on('connect', () => {

      console.log('Connected to the WebSocket server');
      socket.emit('notifyToServer', 'Hello Server!');

    });

    // Manejar los mensajes recibidos
    socket.on('notifyToClient', (message: string) => {

      console.log('Message from server:', message);


    });

    // Manejar la desconexión
    socket.on('disconnect', () => {

      console.log('Disconnected from the WebSocket server');

    });


    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, []);


  return (
    <div>
      <h1>WebSocket Client</h1>
    </div>
  );
};

export default UserConnection;
