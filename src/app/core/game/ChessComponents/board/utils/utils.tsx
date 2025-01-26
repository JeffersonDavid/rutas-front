

import {  getCookie } from '../../../../../appContexts/Auth/Utils';


interface PlayerRoles {
  white: string;
  black: string;
}

export default function getPlayerByRole(role: string): string {
  const storedUserRoles = getCookie('players_roles');

  if (!storedUserRoles) {
    console.error('No se encontró la cookie players_roles');
    return 'undefined';
  }

  let parsedRoles: PlayerRoles;

  try {
    // Intentar parsear la cookie a un objeto
    parsedRoles = JSON.parse(storedUserRoles);
  } catch (error) {
    console.error('Error al parsear la cookie players_roles:', error);
    return 'undefined';
  }

  // Retornar el rol basado en el argumento role
  switch (role) {
    case 'white':
      return parsedRoles.white || 'Jugador Blanco Desconocido';
    case 'black':
      return parsedRoles.black || 'Jugador Negro Desconocido';
    default:
      console.error(`Rol inválido: ${role}`);
      return 'undefined';
  }
}
