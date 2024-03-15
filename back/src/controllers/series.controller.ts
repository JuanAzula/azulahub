import { prismaClient as prisma } from '../prismaClient.ts'
import jwt from 'jsonwebtoken'


async function getSeries(req, res) {
    const series = await prisma.series.findMany()
    res.json(series)
}

async function getOneSeries(req, res) {
    const { id } = req.params
    const series = await prisma.series.findUnique({ where: { id: id } })
    res.json(series)
}

async function createSeries(req, res) {
    const {
        title,
        description,
        releaseYear,
        poster_img,
        genresId,
        score
    } = req.body

    const authorization = req.get('authorization')
    console.log('authorization', authorization)
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodedToken = {}
    if (!token) {
        return res.status(401).json({ error: 'No hay token' });
    }
    try {
        console.log('token', token)
        console.log('process.env.SECRET', process.env.SECRET)
        decodedToken = jwt.verify(token, process.env.SECRET)
        console.log('decodedToken', decodedToken)
    } catch (err) {
        console.log(err)
        return res.status(401).json({ error: 'token missing blabla invalid' })
    }

    if (!decodedToken) {
        return res.status(401).json({ error: 'decoded token missing' })
    }


    const newSeries = await prisma.series.create({
        data: {
            title,
            description,
            releaseYear,
            poster_img,
            genresId,
            score
        }
    })
    res.json(newSeries)
}

async function deleteSeries(req, res) {
    const { id } = req.params
    console.log('entro en delete movie', 'id')

    const authorization = req.get('authorization')
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodedToken = {}
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    if (!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const series = await prisma.series.delete({ where: { id: id } })
    res.json(series)
}

async function updateSeries(req, res) {
    const { id } = req.params
    const { title, description, releaseYear, poster_img, genresId, score } = req.body

    const authorization = req.get('authorization')
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }

    let decodedToken = {}
    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    if (!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    const series = await prisma.series.update({
        where: { id: id },
        data: {
            title,
            description,
            releaseYear,
            poster_img,
            genresId,
            score
        }
    })
    res.json(series)
}

export {
    getSeries,
    getOneSeries,
    createSeries,
    deleteSeries,
    updateSeries
}
