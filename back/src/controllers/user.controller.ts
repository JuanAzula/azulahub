import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { prismaClient as prisma } from '../client/prismaClient.ts'
import { Request, Response } from 'express'



async function getUser(_req: Request, res: Response) {
    console.log('entro en la petición get')
    const users = await prisma.users.findMany()
    res.json(users)
}

async function getUserById(req: Request, res: Response) {
    const { id } = req.params
    const user = await prisma.users.findUnique({ where: { id: id } })
    res.json(user)
}

async function createUser(req: Request, res: Response) {
    const { body } = req
    const { email, name, password } = body
    console.log('entro en la petición post', email, name, password)
    try {

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)
        console.log('passwordHash', passwordHash)
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
    const { id } = req.params
    const user = await prisma.users.delete({ where: { id: id } })
    res.json(user)
}

export {
    getUser,
    createUser,
    deleteUser,
    getUserById
}
