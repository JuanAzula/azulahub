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

export {
    createGenre
}