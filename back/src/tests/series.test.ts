import app from "../app.ts";
import request from "supertest";
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('series petitions', () => {
    test('get all series', async () => {
        const movies = await request(app).get('/api/series')
        expect(movies.status).toBe(200)
    })
    test('get one series', async () => {
        const movie = await request(app).get('/api/series/660d7fd6c0cee288fe57d605')
        expect(movie.status).toBe(200)
    })
    test('create a series', async () => {
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
        const movie = await request(app).post('/api/series').set(mockRequest.headers).send(mockRequest.body)
        expect(movie.status).toBe(200)
    })
})