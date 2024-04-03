import { prismaClient as prisma } from '../client/prismaClient.ts'
import jwt from 'jsonwebtoken'
import { redisClient } from '../client/redisClient.ts'
import { Request, Response } from 'express'



async function getSeries(_req: Request, res: Response) {
    const seriesInRedis = await redisClient.get('series')
    if (seriesInRedis) {
        console.log('seriesInRedis', seriesInRedis)
        res.json(JSON.parse(seriesInRedis))
        return
    }
    const series = await prisma.series.findMany()
    if (!series) {
        res.status(404).json({ message: 'No series found' })
        return
    }
    try {
        await redisClient.set('series', JSON.stringify(series))
        redisClient.expire('series', 60 * 60 * 24);
    } catch (err) {
        console.log('error storing series in redis', err)
    }
    res.json(series)
}

async function getOneSeries(req: Request, res: Response) {
    const { id } = req.params
    const series = await prisma.series.findUnique({ where: { id: id } })
    res.json(series)
}

async function createSeries(req: Request, res: Response) {
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
        if (!process.env.SECRET) {
            throw new Error('Missing SECRET environment variable');
        }
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

async function deleteSeries(req: Request, res: Response) {
    const { id } = req.params
    console.log('entro en delete movie', 'id')

    const authorization = req.get('authorization')
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }
    if (!token || token === null) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    let decodedToken = {}
    try {
        if (!process.env.SECRET) {
            throw new Error('Missing SECRET environment variable');
        }
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

async function updateSeries(req: Request, res: Response) {
    const { id } = req.params
    const { title, description, releaseYear, poster_img, genresId, score } = req.body

    const authorization = req.get('authorization')
    let token = null

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }
    if (!token || token === null) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    let decodedToken = {}
    try {
        if (!process.env.SECRET) {
            throw new Error('Missing SECRET environment variable');
        }
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (err) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    if (!token || !decodedToken) {
        return res.status(401).json({ error: 'token missing or invalid' })
    }

    try {
        const series = await prisma.series.findUnique({ where: { id: id } })

        if (!series) {
            return res.status(404).json({ error: 'series not found' })
        }

        const updatedMovie = await prisma.series.update({
            where: { id: id },
            data: {
                title: title || series.title,
                description: description || series.description,
                releaseYear: releaseYear || series.releaseYear,
                poster_img: poster_img || series.poster_img,
                genresId: genresId || series.genresId,
                score: score || series.score
            }
        })
        res.json(updateSeries)
    } catch (error) {
        console.error('Error updating series:', error)
        res.status(500).json({ error: 'Error updating series' })
    }
}

export {
    getSeries,
    getOneSeries,
    createSeries,
    deleteSeries,
    updateSeries
}
