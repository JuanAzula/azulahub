import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function getMovies (req, res) {
  const movies = await prisma.movie.findMany()
  res.json(movies)
}

async function getMovie (req, res) {
  const { id } = req.params
  const movie = await prisma.movie.findUnique({ where: { id: Number(id) } })
  res.json(movie)
}

async function createMovie (req, res) {
  const {
    title,
    description,
    releaseYear,
    Category,
    categoryId,
    users
  } = req.body
  const newMovie = await prisma.movie.create({
    data: {
      title,
      description,
      releaseYear,
      Category,
      categoryId,
      users
    }
  })
  res.json(newMovie)
}

export { getMovies }
