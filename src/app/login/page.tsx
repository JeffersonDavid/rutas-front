'use client';
import React, { useState } from 'react';
import { useAuthHandler } from './hooks/useAuthHandler';
import CustomAlert from '../components/alerts/customAlert';
import Input from '../components/inputs/input';
import Button from '../components/buttons/button';

const Login: React.FC = () => {
  const { user_is_logged, authError, handleLogin, handleCloseAlert } = useAuthHandler();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <>
      {authError && (
        <CustomAlert
          type="error"
          title="Error de autenticación"
          message="El usuario o contraseña introducido es incorrecto, por favor, introduzca unas credenciales válidas."
          onClose={handleCloseAlert}
        />
      )}

      {!user_is_logged && (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="notification max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-gray-200 mb-6">Iniciar sesión</h2>
            <Input id="name" name="Usuario" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre de usuario" />
            <Input id="password" name="Contraseña" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Contraseña" />
            <Button onClick={() => handleLogin(name, password)} text="Iniciar sesión" />
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
