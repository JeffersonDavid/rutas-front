import React from 'react';


const VerticalNavComponent = () => {

  return (
    <nav className=" nav2 bg-gray-800 w-64 h-screen py-4 px-2 flex flex-col justify-between">
      <div>
        {/* Logo o título del menú */}
        <h1 className="text-white text-xl font-bold mb-4"> Rutas.com </h1>
        
        {/* Enlaces del menú */}
        <ul className="space-y-2">
          <li>
            <a href="/" className="text-white hover:text-gray-300">Genera una nueva ruta</a>
          </li>
        </ul>
      </div>

      <div>
        {/* Otros elementos del menú, como el botón de logout */}
        { /* isAuthenticated &&*/ (
          <button className="bg-red-600 text-white py-2 px-4 rounded-md">Cerrar sesión</button>
        )}
      </div>
    </nav>
  );
};

export default VerticalNavComponent;
