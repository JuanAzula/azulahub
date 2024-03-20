import axios from 'axios'

const baseUrl = 'http://localhost:3333/api/upload'

class UploadService {
    static async upload(file: any, { token }: any) {
        const formData = new FormData();
        formData.append('file', file);
        console.log('token en upload service', token)
        const config = {
            headers: {
                Authorization: token,
                'Content-Type': 'multipart/form-data'
            }
        }
        try {
            const response = await axios.post(baseUrl, formData, config);
            return response.data;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }
}

export { UploadService }