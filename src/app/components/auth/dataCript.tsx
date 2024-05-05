import crypto from 'crypto';
import { UserData } from '../../appContexts/AuthContext';

export const rest_authentication = async (userData: UserData): Promise<void> => {
    try {
      // Cifra los datos del usuario
      const encryptedData = crypt(userData);
      console.log('datos encriptados '+ encryptedData )
  
      // Realiza una solicitud HTTP POST al backend para autenticar al usuario
      const response = await fetch('url_del_backend', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ encryptedData }) // Envía los datos cifrados en el cuerpo de la solicitud
      });
  
      if (response.ok) {
        // La solicitud fue exitosa, puedes manejar la respuesta aquí si es necesario
        console.log('Autenticación exitosa');
      } else {
        // La solicitud falló, maneja el error aquí si es necesario
        console.error('Error en la autenticación');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };
  

export const crypt = (data: any): string => {
    const jsonString = JSON.stringify(data);
    const key = generateRandomKey();
    const iv = crypto.randomBytes(16); // Initialization vector (IV) de 16 bytes para AES
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encrypted = cipher.update(jsonString, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  };

const generateRandomKey = (): Buffer => {
    return crypto.randomBytes(32); // 32 bytes = 256 bits
  };