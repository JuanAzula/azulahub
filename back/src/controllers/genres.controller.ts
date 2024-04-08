import { prismaClient as prisma } from '../client/prismaClient.ts'
import { Request, Response } from 'express'

async function createGenre(req: Request, res: Response) {
    const { name } = req.body
    try {
        const genre = await prisma.genres.create({
            data: {
                name: name

            }
        })
        res.json(genre)
    } catch (err) {
        console.error('Error creating genre:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getGenres(_req: Request, res: Response) {
    try {
        const genres = await prisma.genres.findMany()
        res.json(genres)
    } catch (err) {
        console.error('Error getting genres:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getGenre(req: Request, res: Response) {
    const { name } = req.params
    try {
        const genre = await prisma.genres.findUnique({
            where: {
                name: name
            }
        })
        res.json(genre)
    } catch (err) {
        console.error('Error getting genre:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteGenre(req: Request, res: Response) {
    const { name } = req.params
    console.log(name)
    try {
        const genre = await prisma.genres.delete({
            where: {
                name: name
            }
        })
        res.json(genre)
    } catch (err) {
        console.error('Error deleting genre:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {
    createGenre,
    getGenres,
    getGenre,
    deleteGenre
}