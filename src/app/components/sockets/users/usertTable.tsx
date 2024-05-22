'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../../appContexts/AuthContext';

interface User {
  name: string;
  email: string;
  log_status: 'online' | 'offline';
}

const UsersTable = () => {
  const { authToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios

  useEffect(() => {
    // Crear una nueva conexión socket.io
    const socket: Socket = io('http://localhost:4000');

    // Manejar la conexión abierta
    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
      socket.emit('getUsersList', authToken );
    });

    // Manejar la recepción de datos del servidor
    socket.on('getUsersList', (data) => {
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Expected an array but received:', data);
      }
    });

    // Limpiar la conexión cuando el componente se desmonte
    return () => {
      socket.disconnect();
    };
  }, [authToken]); // Añadimos authToken como dependencia

  // Renderizar la tabla de usuarios
  return (
    <div className="dark:bg-gray-800 p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Tabla de Usuarios</h1>
      <table className="min-w-full bg-gray-900 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-700">Name</th>
            <th className="py-2 px-4 border-b border-gray-700">Email</th>
            <th className="py-2 px-4 border-b border-gray-700">Status</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-700">
              <td className="py-2 px-4 border-b border-gray-700">{user.name}</td>
              <td className="py-2 px-4 border-b border-gray-700">{user.email}</td>
              <td className="py-2 px-4 border-b border-gray-700">{user.log_status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
