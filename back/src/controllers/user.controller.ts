import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { prismaClient as prisma } from '../client/prismaClient.ts'
import { Request, Response } from 'express'



async function getUser(_req: Request, res: Response) {
    try {
        const users = await prisma.users.findMany()
        res.json(users)
    } catch (err) {
        console.error('Error getting user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserById(req: Request, res: Response) {
    const { email } = req.body
    try {
        const user = await prisma.users.findUnique({ where: { email: email } })
        res.json(user)
    } catch (err) {
        console.error('Error getting user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function createUser(req: Request, res: Response) {
    const { body } = req
    const { email, name, password } = body
    try {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        const newUser = await prisma.users.create({
            data: {
                email,
                name,
                password: passwordHash
            }
        })


        res.status(201).json(newUser)
    }
    catch (err) {
        console.error('Error creating user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteUser(req: Request, res: Response) {
    const { email } = req.body
    try {
        const user = await prisma.users.delete({ where: { email: email } })
        res.json(user)
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export {
    getUser,
    createUser,
    deleteUser,
    getUserById
}
