import axios from 'axios'


const URL_MOVIES = 'http://localhost:3333/api/movies'

class MovieService {
    static async getMovies() {
        try {
            const response = await axios.get(URL_MOVIES)
            return response.data
        } catch (err) {
            return null
        }
    }

    static async getMovie(id: string) {
        return (await axios.get(URL_MOVIES + '/' + id)).data
    }

    static async postMovie(movie: any, { token }: any) {
        const config = {
            headers: {
                Authorization: token
            }
        }
        delete movie?.id
        const response = await axios.post(URL_MOVIES, movie, config)
        return response.data
    }

    static async patchMovie(movie: { id: string }, { token }: any) {
        const config = {
            headers: {
                Authorization: token
            }
        }
        const response = await axios.patch(URL_MOVIES + '/' + movie.id, movie, config)
        return response.data
    }

    static async deleteMovie(id: string, { token }: any) {
        const config = {
            headers: {
                Authorization: token
            }
        }
        return await axios.delete(URL_MOVIES + '/' + id, config)
    }
}

export { MovieService }
