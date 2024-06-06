'use client';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../../../appContexts/AuthContext';
import { FaEllipsisV } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  log_status: number;
}

const UsersTable = () => {
  const { authToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [dropdownVisible, setDropdownVisible] = useState<number | null>(null);

  useEffect(() => {
    const socket: Socket = io('http://localhost:4000');

    socket.on('connect', () => {
      console.log('Connected to the WebSocket server');
      socket.emit('getUsersList', authToken); // Emitir el token para obtener la lista de usuarios
    });

    socket.on('getUsersList', (data_) => {
      console.log('Received user data from socket');
      console.log(data_);

      // Asegurarse de que 'data_' tenga la propiedad 'data' que contiene la lista de usuarios
      const data = data_.data.data;

      console.log('parsed data');
      console.log(data)

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
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-700 transition duration-200">
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
