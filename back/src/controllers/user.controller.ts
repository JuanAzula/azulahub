import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { prismaClient as prisma } from '../prismaClient'


async function getUser(request, response) {
    console.log('entro en la petición get')
    const users = await prisma.user.findMany()
    response.json(users)
}

async function createUser(request, response) {
    const { body } = request
    const { email, name, password } = body
    // console.log('entro en la petición post', email, name, password)
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


        response.status(201).json(newUser)
    }
    catch (err) {
        console.error('Error creating user:', err);
        response.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteUser(request, response) {
    const { id } = request.params
    const user = await prisma.users.delete({ where: { id: id } })
    response.json(user)
}

export {
    getUser,
    createUser,
    deleteUser
}
