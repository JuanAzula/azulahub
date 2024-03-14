import { prismaClient as prisma } from '../prismaClient.ts'


async function getMovies(req, res) {
  const movies = await prisma.movies.findMany()
  res.json(movies)
}

async function getMovie(req, res) {
  const { id } = req.params
  const movie = await prisma.movies.findUnique({ where: { id: Number(id) } })
  res.json(movie)
}

async function createMovie(req, res) {
  const {
    title,
    description,
    releaseYear,
    poster_img,
    genre,
    genresId,
    score,
  } = req.body
  const newMovie = await prisma.movies.create({
    data: {
      title,
      description,
      releaseYear,
      poster_img,
      genre,
      genresId,
      score,
    }
  })
  res.json(newMovie)
}

async function deleteMovie(req, res) {
  const { id } = req.params
  const movie = await prisma.movie.delete({ where: { id: Number(id) } })
  res.json(movie)
}

export {
  getMovies,
  getMovie,
  createMovie
}
