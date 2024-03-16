import axios from 'axios'

let token = null

class TokenService {
    static async setToken(newToken: string) {
        token = `Bearer ${newToken}`
    }
}
// Definimos de qué ruta recogemos los Seriess
const URL_SERIES = 'http://localhost:3002/api/Series'

class SeriesService {
    static async getSeries() { // static para que se pueda llamar a la función getSeriess sin estar dentro de la clase
        try {
            const respuesta = await axios.get(URL_SERIES) // recogemos la respuesta del servidor
            return respuesta.data // .data es un método de axios para pasar los Seriess a json
        } catch (err) {
            alert('No se ha podido obtener los Seriess') // alerta de error preparada en caso de no haber obtenido los Seriess
            return []
        }
    }

    static async getOneSeries(id: string) { // a través de la función getSeriess por id, mostramos el Series con el id recibido
        return (await axios.get(URL_SERIES + '/' + id)).data
    }

    static async postSeries(series: any, { token }: any) {
        // función post para agregar un series
        const config = {
            headers: {
                Authorization: token
            }
        }
        delete series.id // borramos el id porque el id se crea aleatoriamente y no lo deberíam escoger nosotros
        const respuesta = await axios.post(URL_SERIES, series, config) // el método post de axios envia el Series al servidor database, el primer parámetro especifica el servidor
        return respuesta.data // retornamos los Seriess
    }

    static async putSeries(series: any, { token }: any) { // función put para actualizar un Series
        const config = {
            headers: {
                Authorization: token
            }
        }
        const respuesta = await axios.put(URL_SERIES + '/' + series.id, series, config)// el primer argumento especifica el servidor y el Series que se quiere actualizar mediante id, el segundo parámetro es el produducto actualizado
        return respuesta.data
    }

    static async patchSeries(series: any, { token }: any) { // función patch para actualizar un Series
        const config = {
            headers: {
                Authorization: token
            }
        }
        const respuesta = await axios.patch(URL_SERIES + '/' + series.id, series, config) // lo mismo, pero con otra mecánica, los valores que no cambias en lugar de borrarse, se mantienen
        return respuesta.data
    }

    static async deleteSeries(id: string, { token }: any) { // función delete para borrar un Series
        const config = {
            headers: {
                Authorization: token
            }
        }
        return await axios.delete(URL_SERIES + '/' + id, config) // el método de axios elimina el Series con el id recibido
    }
}

export { TokenService, SeriesService, token }
