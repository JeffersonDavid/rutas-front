'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../../appContexts/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  log_status: 'online' | 'offline';
}

const UsersTable = () => {
  const { authToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]); // Estado para almacenar la lista de usuarios

  useEffect(() => {
    const socket: Socket = io('http://localhost:4000');

    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
      socket.emit('getUsersList', authToken);
    });

    socket.on('getUsersList', (data_) => {
      console.log('user data socket');
      console.log(data_);

      const data = data_.data;
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error('Expected an array but received:', data);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [authToken]);

  // Obtener el ID del usuario actual desde localStorage
  const currentUserData = localStorage.getItem('user_data');
  const currentUserId = currentUserData ? JSON.parse(currentUserData).id : null;

  // Filtrar los usuarios para excluir al usuario actual
  const filteredUsers = users.filter(user => user.id !== currentUserId);

  // Renderizar la tabla de usuarios
  return (
    <div className="dark:bg-gray-800 p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Tabla de Usuarios</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b border-gray-700">ID</th>
              <th className="py-3 px-6 border-b border-gray-700">Name</th>
              <th className="py-3 px-6 border-b border-gray-700">Email</th>
              <th className="py-3 px-6 border-b border-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-700 transition duration-200">
                <td className="py-3 px-6 border-b border-gray-700">{user.id}</td>
                <td className="py-3 px-6 border-b border-gray-700">{user.name}</td>
                <td className="py-3 px-6 border-b border-gray-700">{user.email}</td>
                <td className="py-3 px-6 border-b border-gray-700">{user.log_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
