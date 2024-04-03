import axios from "axios";

let token: string | null = null

const BASE_URL = 'http://localhost:3333/api/login/valid'

class TokenService {
    static async setToken(newToken: string) {
        token = `Bearer ${newToken}`
    }
    static async validateToken(token: string) {
        try {
            const response = await axios.post(BASE_URL, { token });

            if (response.status === 200) {
                console.log('Token is valid', response);
                return true; // Token is valid
            } else {
                console.log('Token is invalid', response);
                return false; // Token is invalid
            }
        } catch (error) {
            console.error('Error validating token:', error);
            return false; // Error occurred while validating token
        }
    }
}

export { TokenService, token }