import { UserData } from '../../appContexts/AuthContext';

interface JsonRequest {
    data: string;
}

export const rest_authentication = async (userData: UserData): Promise<string | null> => {
    try {
        const data = JSON.stringify(userData);
        const dataBase64 = btoa(data);
        const restToken = await fetchData({ data: dataBase64 });
        
        if (restToken && restToken.token) {
            return restToken.token;
        } else {
            console.error('Token not found in response:', restToken);
            return null;
        }
    } catch (error) {
        console.error('Error during authentication:', error);
        return null;
    }
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
        if(responseData.token){
            return responseData
        }else{
            return null;
        }

    } catch (error:any) {
        console.error('Error:', error.message);
        return null
    }
};


