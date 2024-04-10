import app from "../app.ts";
import request from "supertest";

describe('genres petitions', () => {
    test('get all genres', async () => {
        const movies = await request(app).get('/api/genres')
        expect(movies.status).toBe(200)
    })
    test('get one genre', async () => {
        const movie = await request(app).get('/api/genres/superheroes')
        expect(movie.status).toBe(200)
    })
    test('create a genre', async () => {
        const mockRequest = {
            body: {
                name: "action"
            }
        }
        const genre = await request(app).post('/api/genres').send(mockRequest.body)
        expect(genre.status).toBe(200)
    })
    test('delete a genre', async () => {
        const genre = await request(app).delete('/api/genres/action')
        expect(genre.status).toBe(200)
    })
})