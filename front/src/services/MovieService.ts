import axios from 'axios'


// Definimos de qué ruta recogemos los Movies
const URL_MOVIES = 'http://localhost:3333/api/movies'

class MovieService {
    static async getMovies() { // static para que se pueda llamar a la función getMovies sin estar dentro de la clase
        try {
            const response = await axios.get(URL_MOVIES) // recogemos la response del servidor
            return response.data // .data es un método de axios para pasar los Movies a json
        } catch (err) {
            alert('No se ha podido obtener los Movies') // alerta de error preparada en caso de no haber obtenido los Movies
            return []
        }
    }

    static async getMovie(id: string) { // a través de la función getMovies por id, mostramos el Movie con el id recibido
        return (await axios.get(URL_MOVIES + '/' + id)).data
    }

    static async postMovie(movie: any, { token }: any) {
        // función post para agregar un Movie
        const config = {
            headers: {
                Authorization: token
            }
        }
        delete movie?.id // borramos el id porque el id se crea aleatoriamente y no lo deberíamos escoger nosotros
        const response = await axios.post(URL_MOVIES, movie, config) // el método post de axios envia el Movie al servidor database, el primer parámetro especifica el servidor
        return response.data // retornamos los Movies
    }

    static async patchMovie(movie: { id: string }, { token }: any) { // función patch para actualizar un Movie
        const config = {
            headers: {
                Authorization: token
            }
        }
        const response = await axios.patch(URL_MOVIES + '/' + movie.id, movie, config) // lo mismo, pero con otra mecánica, los valores que no cambias en lugar de borrarse, se mantienen
        return response.data
    }

    static async deleteMovie(id: string, { token }: any) { // función delete para borrar un Movie
        const config = {
            headers: {
                Authorization: token
            }
        }
        return await axios.delete(URL_MOVIES + '/' + id, config) // el método de axios elimina el Movie con el id recibido
    }
}

export { MovieService }
