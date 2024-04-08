// import { getMovies } from "../controllers/movies.controller";
import app from "../app.ts";
import request from "supertest";
import { toMatchImageSnapshot } from 'jest-image-snapshot';

expect.extend({ toMatchImageSnapshot });

describe('movies petitions', () => {
    test('getMovies', async () => {
        const mockRequest = {
            params: {}, // You can add any required properties here
            query: {}, // You can add query parameters here
            body: {}, // You can add a request body if needed
        };
        const movies = await request(app).get('/api/movies').send(mockRequest)
        expect(movies.status).toBe(200)

        // const moviesResponse = JSON.parse(movies.text)
        // expect(moviesResponse).toMatchImageSnapshot()
    })
    test('getMovie', async () => {
        const mockRequest = {
            params: { id: "660d7fd6c0cee288fe57d605" }, // You can add any required properties here
            query: {}, // You can add query parameters here
            body: {}, // You can add a request body if needed
        };
        const movie = await request(app).get('/api/movies/660d7fd6c0cee288fe57d605')
        expect(movie.status).toBe(200)
    })
})