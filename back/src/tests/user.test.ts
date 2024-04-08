import app from "../app.ts";
import request from "supertest";

describe('user petitions', () => {
    test('create a user', async () => {
        const mockRequest = {

            body: { id: "1", email: "admin@example.com", password: "123456K*", name: "admin", movies: [], series: [] }, // You can add a request body if needed
        };
        const user = await request(app).post('/api/users').send(mockRequest.body)
        expect(user.status).toBe(201)
    })
})