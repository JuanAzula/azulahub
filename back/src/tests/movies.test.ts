import app from "../app.ts";
import request from "supertest";
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('movies petitions', () => {
    test('getMovies', async () => {
        const movies = await request(app).get('/api/movies')
        expect(movies.status).toBe(200)

        // Snapshot test commented because we don`t really need it in the backend
        // const moviesResponse = JSON.parse(movies.text)
        // expect(moviesResponse).toMatchImageSnapshot()
    })
    test('getMovie', async () => {
        const movie = await request(app).get('/api/movies/660d7fd6c0cee288fe57d605')
        expect(movie.status).toBe(200)
    })
    test('createMovie', async () => {
        const mockRequest = {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzEyNTk4Nzg3LCJleHAiOjE3MTI2ODUxODd9.gFGKQbYZWs-QXjkTbmzwQwxCHh0Dl8u5kraCe46k7RM",
            },
            body: {
                title: "How I Met Your Mother",
                description: "The epic comeback of Dominick Toreto",
                releaseYear: 2043,
                poster_img: "https://res.cloudinary.com/dgtamgaup/image/upload/v1710430305/ddx5zoocjndw9w70y2co.webp",
                genresName: "superheroes",
                score: 7,
                authorEmail: "admin@example.com"
            },
        };
        const movie = await request(app).post('/api/movies').set(mockRequest.headers).send(mockRequest.body)
        expect(movie.status).toBe(200)
    })
    test('deleteMovie', async () => {
        const mockRequest = {
            headers: {
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwiaWF0IjoxNzEyNTk4Nzg3LCJleHAiOjE3MTI2ODUxODd9.gFGKQbYZWs-QXjkTbmzwQwxCHh0Dl8u5kraCe46k7RM",
            },
        }
        const movie = await request(app).delete('/api/movies/660d7fd6c0cee288fe57d605').set(mockRequest.headers)
        expect(movie.status).toBe(200)
    })
})