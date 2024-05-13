'use client'
import React, { useState, useEffect } from 'react';
import { useAuth } from '../appContexts/AuthContext';
import CustomAlert from '../components/alerts/customAlert';
import { useRouter,useParams } from 'next/navigation'
import { useLoader } from '../appContexts/AppLoader';

const Login = () => {

  const { login } = useAuth(); 
  const [name, setname] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);
  const router = useRouter()
  const loginSignal = 'loginstate'
  const { isLoading, setIsLoading } = useLoader();

  useEffect(() => {
  
    if (!isLoading) {
      const seed = localStorage.getItem(loginSignal);
      if (seed) {
        setAuthError(true);
        localStorage.removeItem(loginSignal);
      }
    }

  }, [authError,isLoading])
  
  const handleLogin = async () => {
    const userData = { name, password };
    try {
      
      setIsLoading(true);
      await login(userData);
      localStorage.removeItem(loginSignal);

    } catch (error) {
      setIsLoading(false);
    } finally {
      localStorage.setItem(loginSignal, 'failed');
    }
    
  };

  const handleCloseAlert = () => {
    setAuthError(false);
  };

  return (
    <>
      {authError && (
        <CustomAlert 
          type='error'
          title="Error de autentificacion" 
          message="El usuario o contraseña introducido es incorrecto, por favor, introduzca unas credenciales válidas." 
          onClose={handleCloseAlert} // Agrega un manejador para cerrar el alert
        />
      )}
      <div className="notification max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-200 mb-6">Iniciar sesión</h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-300">Usuario</label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setname(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-indigo-300" placeholder="Nombre de usuario" required />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-300">Contraseña</label>
          <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 mt-1 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring focus:ring-indigo-300" placeholder="Contraseña" required />
        </div>
        <button type="button" onClick={handleLogin} className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300">Iniciar sesión</button>
      </div>
    </>
  );
};

export default Login;
