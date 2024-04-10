import axios from 'axios'



const URL_SERIES = 'http://localhost:3333/api/series'

class SeriesService {
    static async getSeries() {
        try {
            const response = await axios.get(URL_SERIES)
            return response.data
        } catch (err) {
            return null
        }
    }

    static async getOneSeries(id: string) {
        return (await axios.get(URL_SERIES + '/' + id)).data
    }

    static async postSeries(series: any, { token }: any) {

        const config = {
            headers: {
                Authorization: token
            }
        }
        delete series.id
        const response = await axios.post(URL_SERIES, series, config)
        return response.data
    }

    static async patchSeries(series: any, { token }: any) {
        const config = {
            headers: {
                Authorization: token
            }
        }
        const response = await axios.patch(URL_SERIES + '/' + series.id, series, config)
        return response.data
    }

    static async deleteSeries(id: string, { token }: any) {
        const config = {
            headers: {
                Authorization: token
            }
        }
        return await axios.delete(URL_SERIES + '/' + id, config)
    }
}

export { SeriesService }
