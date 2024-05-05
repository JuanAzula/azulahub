import { Request, Response } from "express"
import { prismaClient as prisma } from '../client/prismaClient.ts'

export const search = async (req: Request, res: Response) => {
    const { term } = req.params;
    console.log('term', term)
    if (!term) {
        res.status(400).json({ message: "Bad request" })
        return
    }

    try {
        const moviesResults = await prisma.movies.findMany({
            where: {
                title: {
                    startsWith: term,
                    mode: 'insensitive'
                }
            }
        })

        console.log('moviesResults', moviesResults)

        const seriesResults = await prisma.series.findMany({
            where: {
                title: {
                    startsWith: term,
                    mode: 'insensitive'
                }
            }
        })

        const response = {
            movies: moviesResults,
            series: seriesResults
        }

        res.status(200).send(response)

    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}

export const searchGenres = async (req: Request, res: Response) => {
    const { id } = req.params;
    console.log('id', id)
    if (!id) {
        res.status(400).json({ message: "Bad request" })
        return
    }

    try {
        const moviesResults = await prisma.movies.findMany({
            where: {
                genresName: id
            }
        })

        console.log('moviesResults', moviesResults)

        const seriesResults = await prisma.series.findMany({
            where: {
                genresName: id
            }
        })

        const response = {
            movies: moviesResults,
            series: seriesResults
        }

        res.status(200).send(response)

    } catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
}
