import { jwt } from 'jsonwebtoken'
import { bcrypt } from 'bcrypt'
import { prismaClient as prisma } from '../prismaClient'


async function getUser(request, response) {
    console.log('entro en la petición get')
    const users = await prisma.user.findMany()
    response.json(users)
}

async function createUser(request, response) {
    const { body } = request
    const { username, name, password } = body
    console.log('entro en la petición post')
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new prisma.user.create({
        username,
        name,
        passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
}

async function deleteUser(request, response) {
    const { id } = request.params
    const user = await prisma.user.delete({ where: { id: Number(id) } })
    response.json(user)
}

export {
    getUser,
    createUser
}
