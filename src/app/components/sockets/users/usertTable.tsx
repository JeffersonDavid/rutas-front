'use client';
import { useState, useEffect } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { useWebSocket } from '../../../appContexts/WebsocketContext'; 
import { useAuth } from '@/app/appContexts/Auth/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  log_status: number;
}

const UsersTable = () => {

  const { authToken } = useAuth();
  const { socket } = useWebSocket();
  const [users, setUsers] = useState<User[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  useEffect(() => {
    if (socket) {
      socket.on('getUsersList', (data_) => {
        console.log('Received user data from socket', data_);

        // Verificar si data_ y data_.data existen antes de acceder a data_.data.data
        const data = data_?.data?.data; 

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Expected an array but received:', data);
        }
      });

      // Emitir evento para obtener la lista de usuarios al conectar
      socket.emit('getUsersList', authToken );

      return () => {
        socket.off('getUsersList'); // Limpiar suscripción
      };
    }
  }, [socket]);

  const currentUserData = localStorage.getItem('user_data');
  const currentUserId = currentUserData ? JSON.parse(currentUserData).id : null;
  const filteredUsers = users.filter(user => user.id !== currentUserId);

  const handleDropdownClick = (userId: number) => {
    setDropdownVisible(dropdownVisible === userId ? null : userId);
  };

  return (
    <div className="dark:bg-gray-800 p-4 min-h-screen">
      <h1 className="text-2xl font-bold text-white mb-4">Jugadores conectados</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-900 text-white rounded-lg shadow-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 border-b border-gray-700">User</th>
              <th className="py-3 px-6 border-b border-gray-700">Email</th>
              <th className="py-3 px-6 border-b border-gray-700">Status</th>
              <th className="py-3 px-6 border-b border-gray-700">Options</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="hover:bg-gray-700 transition duration-200">
                <td className="py-3 px-6 border-b border-gray-700 flex items-center">
                  <img src={`https://via.placeholder.com/40?text=${user.name.charAt(0)}`} alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-400">{user.email}</div>
                  </div>
                </td>
                <td className="py-3 px-6 border-b border-gray-700">{user.email}</td>
                <td className="py-3 px-6 border-b border-gray-700 flex items-center">
                  <span className={`inline-block w-3 h-3 rounded-full mr-2 ${user.log_status === 1 ? 'bg-green-500' : 'bg-gray-500'}`}></span>
                  {user.log_status === 1 ? 'Online' : 'Offline'}
                </td>
                <td className="py-3 px-6 border-b border-gray-700 text-center relative">
                  <button className="text-gray-400 hover:text-white" onClick={() => handleDropdownClick(user.id)}>
                    <FaEllipsisV />
                  </button>
                  {dropdownVisible === user.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
                      <ul className="py-1">
                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Option 1</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Option 2</a>
                        </li>
                        <li>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700">Option 3</a>
                        </li>
                      </ul>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
