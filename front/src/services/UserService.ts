import axios from "axios"

const baseUrl = 'http://localhost:3333/api/users'
export class UserService {
    static async getUsers() {
        try {
            const respuesta = await axios.get(baseUrl)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }
    static async getUser(id: string) {
        try {
            const respuesta = await axios.get(baseUrl + id)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }
    static async postUser(user: any) {
        try {
            const respuesta = await axios.post(baseUrl, user)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }
    static async deleteUser(id: string) {
        try {
            const respuesta = await axios.delete(baseUrl + id)
            return respuesta.data
        } catch (error) {
            console.log(error)
        }
    }
}
