import { prismaClient as prisma } from '../prismaClient.ts'
import jwt from 'jsonwebtoken'
import { redisClient } from '../prismaClient.ts'
import { Request, Response } from 'express'



async function getMovies(_req: Request, res: Response) {
  const moviesInRedis = await redisClient.get('movies')
  if (moviesInRedis) {
    console.log('moviesInRedis', moviesInRedis)
    res.json(JSON.parse(moviesInRedis))
    return
  }
  const movies = await prisma.movies.findMany()
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

  const movieInRedis = await redisClient.get('movies:' + id)
  if (movieInRedis) {
    console.log('movieInRedis', movieInRedis)
    res.json(JSON.parse(movieInRedis))
    return
  }

  const movie = await prisma.movies.findUnique({ where: { id: id } })
  res.json(movie)
}

async function createMovie(req: Request, res: Response) {
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

  try {

    const newMovie = await prisma.movies.create({
      data: {
        title,
        description,
        releaseYear,
        poster_img,
        genresId,
        score
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
  } catch (e) {
    console.log('Error creating new movie', e)
    res.status(500).json({ error: 'Error creating new movie' })
  }
}

async function deleteMovie(req: Request, res: Response) {
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
  const { title, description, releaseYear, poster_img, genresId, score } = req.body
  console.log('entro en update movie', 'id', id)
  const authorization = req.get('authorization')
  let token = null

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7)
  }

  if (!token || token === null) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  console.log('apunto de caerme')
  let decodedToken = {}
  if (!process.env.SECRET) {
    throw new Error('Missing SECRET environment variable');
  }
  try {
    decodedToken = jwt.verify(token, process.env.SECRET)
  } catch (err) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  if (!token || !decodedToken) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
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
        genresId: genresId || movie.genresId,
        score: score || movie.score
      }
    })
    const movies = await redisClient.get('movies')
    if (!movies) {
      return
    }
    const moviesUpdated = JSON.parse(movies).filter((movie: { id: string }) => movie.id !== id)
    moviesUpdated.push(updatedMovie)
    await redisClient.set('movies', JSON.stringify(moviesUpdated))
    res.json(updatedMovie)
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
