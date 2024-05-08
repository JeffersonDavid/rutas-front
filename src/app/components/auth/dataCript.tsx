import { UserData } from '../../appContexts/AuthContext';


interface JsonRequest {
    data: string;
}


export const rest_authentication = async (userData: UserData): Promise<string> => {

    const data = JSON.stringify(userData);
    const dataBase64 = btoa(data);
    const rest_token = fetchData( {data:dataBase64} )

    console.log('auth completed')
    console.log(await rest_token)

    return '';
};


const fetchData = async ( data:JsonRequest ) => {

    try {

        const rawData = data;

        const response = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rawData)
        });

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const responseData = await response.json();
        return responseData

    } catch (error:any) {
        console.error('Error:', error.message);
    }
};


