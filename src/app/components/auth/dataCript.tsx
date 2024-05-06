import jwt from 'jsonwebtoken';
import { UserData } from '../../appContexts/AuthContext';

export const rest_authentication = async ( userData: UserData ): Promise<void> => {

   const data_crypted = crypt (userData );

   console.log('data crypted')
   console.log(data_crypted)
   
 
};



const crypt = (payload: JsonObject): string => {
    const secretKey = 'test';
    // Define el tiempo de expiración del token (puedes ajustarla según sea necesario)
    const expirationTime = '1h'; // 1 hora de duración del token
    // Genera el token JWT
    const token = jwt.sign(payload, secretKey, { expiresIn: expirationTime });
    return token
};

interface JsonObject {
    [key: string]: any;
}
