// import { getMovies } from "../controllers/movies.controller";
import app from "../app.ts";
import request from "supertest";

describe('movies petitions', () => {
    test('getMovies', async () => {
        const mockRequest = {
            params: {}, // You can add any required properties here
            query: {}, // You can add query parameters here
            body: {}, // You can add a request body if needed
        };
        const movies = await request(app).get('/api/movies').send(mockRequest)
        expect(movies.status).toBe(200)
    })
})