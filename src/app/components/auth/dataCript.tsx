import { UserData } from '../../appContexts/AuthContext';

export const rest_authentication = async (userData: UserData): Promise<string> => {
    const mensaje = JSON.stringify(userData);
    const mensajeBase64 = btoa(mensaje);
    console.log(mensajeBase64)
    return mensajeBase64;
};
