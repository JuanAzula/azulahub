import axios from 'axios'


// Definimos de qué ruta recogemos los Seriess
const URL_SERIES = 'http://localhost:3333/api/series'

class SeriesService {
    static async getSeries() { // static para que se pueda llamar a la función getSeriess sin estar dentro de la clase
        try {
            const response = await axios.get(URL_SERIES) // recogemos la response del servidor
            return response.data // .data es un método de axios para pasar los Seriess a json
        } catch (err) {
            return null
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
        const response = await axios.post(URL_SERIES, series, config) // el método post de axios envia el Series al servidor database, el primer parámetro especifica el servidor
        return response.data // retornamos los Seriess
    }

    static async patchSeries(series: any, { token }: any) { // función patch para actualizar un Series
        const config = {
            headers: {
                Authorization: token
            }
        }
        const response = await axios.patch(URL_SERIES + '/' + series.id, series, config) // lo mismo, pero con otra mecánica, los valores que no cambias en lugar de borrarse, se mantienen
        return response.data
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

export { SeriesService }
