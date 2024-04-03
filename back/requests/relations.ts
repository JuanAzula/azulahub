import { prismaClient as prisma } from '../src/client/prismaClient.ts'

async function main() {

    const movies = await prisma.movies.findUnique({
        where: {
            id: "660d3cf5b97039bdd81c27fc"
        },
        include: {
            author: true,
            genres: true
        }
    })
    console.log(movies.author.name)
}

export { main }