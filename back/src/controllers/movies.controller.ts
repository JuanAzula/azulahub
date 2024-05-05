import { prismaClient as prisma } from '../client/prismaClient.ts'
import jwt from 'jsonwebtoken'
import { redisClient } from '../client/redisClient.ts'
import { Request, Response } from 'express'



async function getMovies(_req: Request, res: Response) {
  const moviesInRedis = await redisClient.get('movies')
  if (moviesInRedis) {
    res.json(JSON.parse(moviesInRedis))
    return
  }
  const movies = await prisma.movies.findMany(
    {
      include: {
        author: true,
        genres: true
      }
    }
  )
  if (!movies) {
    res.status(404).json({ message: 'No movies found' })
    return
  }
  try {
    await redisClient.set('movies', JSON.stringify(movies))
    redisClient.expire('movies', 60 * 60 * 24);
  }
  catch (err) {
    console.log('error storing movies in redis', err)
  }
  res.json(movies)
}

async function getMovie(req: Request, res: Response) {
  const { id } = req.params

  // const movieInRedis = await redisClient.get('movies:' + id)
  // if (movieInRedis) {
  //   res.json(JSON.parse(movieInRedis))
  //   return
  // }

  const movie = await prisma.movies.findUnique({
    where: { id: id },
    include: {
      author: true,
      genres: true
    }
  })
  res.json(movie)
}

async function createMovie(req: Request, res: Response) {
  const {
    title,
    description,
    releaseYear,
    poster_img,
    genresName,
    authorEmail,
    score
  } = req.body

  try {

    const newMovie = await prisma.movies.create({
      data: {
        title,
        description,
        releaseYear,
        poster_img,
        genres: {
          connect: { name: genresName }
        },
        score,
        author: {
          connect: { email: authorEmail }
        }
      }
    })

    // Add the movie to Redis
    const moviesInRedis = await redisClient.get('movies')
    let movies = []
    if (moviesInRedis) {
      movies = JSON.parse(moviesInRedis)
    }
    movies.push(newMovie)
    await redisClient.set('movies', JSON.stringify(movies))
    redisClient.expire('movies', 60 * 60 * 24);

    res.json(newMovie)
  } catch (err) {
    console.log('Error creating new movie', err)
    res.status(500).json({ error: 'Error creating new movie' })
  }
}

async function deleteMovie(req: Request, res: Response) {
  const { id } = req.params


  const movie = await prisma.movies.delete({ where: { id: id } })
  res.json(movie)

  try {
    const movies = await redisClient.get('movies')
    if (!movies) {
      return
    }
    const moviesFiltered = JSON.parse(movies).filter((movie: { id: string }) => movie.id !== id)
    await redisClient.set('movies', JSON.stringify(moviesFiltered))
  }
  catch (err) {
    console.log('error deleting movie from redis', err)
  }
}

async function updateMovie(req: Request, res: Response) {
  const { id } = req.params
  const { title, description, releaseYear, poster_img, genresName, score } = req.body
  try {
    const movie = await prisma.movies.findUnique({ where: { id: id } })
    if (!movie) {
      return res.status(404).json({ error: 'movie not found' })
    }

    const updatedMovie = await prisma.movies.update({
      where: { id: id },
      data: {
        title: title || movie.title,
        description: description || movie.description,
        releaseYear: releaseYear || movie.releaseYear,
        poster_img: poster_img || movie.poster_img,
        genresName: genresName || movie.genresName,
        score: score || movie.score
      }
    })
    const movies = await prisma.movies.findMany(
      {
        include: {
          author: true,
          genres: true
        }
      }
    )
    await redisClient.set('movies', JSON.stringify(movies))
    redisClient.expire('movies', 60 * 60 * 24);
  }
  catch (err) {
    console.log('error updating movie from redis', err)
  }
}

export {
  getMovies,
  getMovie,
  createMovie,
  deleteMovie,
  updateMovie
}
