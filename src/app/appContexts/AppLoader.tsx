'use client'
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Definimos los tipos para el contexto
interface LoaderContextType {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

// Creamos el contexto global
const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

// Componente que actúa como proveedor del contexto
const LoaderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Establecer isLoading en false después de 3 segundos si isLoading es true
    let timer: NodeJS.Timeout;
    if (isLoading) {
      timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }

    // Limpiar el temporizador cuando se desmonte el componente
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {isLoading ? (
        // Aquí puedes colocar tu componente de carga o loader
        <div className="flex justify-center items-center h-screen bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-200"></div>
        </div>
      ) : (
        // Renderiza los children si isLoading es falso
        children
      )}
    </LoaderContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
const useLoader = (): LoaderContextType => {
  const context = useContext(LoaderContext);
  if (!context) {
    throw new Error('useLoader debe ser usado dentro de un LoaderProvider');
  }
  return context;
};

export { LoaderProvider, useLoader };
