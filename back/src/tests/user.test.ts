import app from "../app.ts";
import request from "supertest";

describe('user petitions', () => {
    test('get all users', async () => {
        const users = await request(app).get('/api/users')
        expect(users.status).toBe(200)
    })
    test('get one user', async () => {
        const mockRequest = {
            body: {
                email: "test@example.com"
            }
        }
        const user = await request(app).get('/api/users/tester').send(mockRequest.body)
        expect(user.status).toBe(200)
    })
    test('create a user', async () => {
        const mockRequest = {

            body: { id: "5", email: "test@example.com", password: "test*", name: "tester", movies: [], series: [] }, // You can add a request body if needed
        };
        const user = await request(app).post('/api/users').send(mockRequest.body)
        expect(user.status).toBe(201)
    })
    test('delete a user', async () => {
        const mockRequest = {
            body: {
                email: "test@example.com"
            }
        }
        const user = await request(app).delete('/api/users/tester').send(mockRequest.body)
        expect(user.status).toBe(200)
    })
})