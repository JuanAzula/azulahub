import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prismaClient as prisma } from '../client/prismaClient.ts'
import { Request, Response } from 'express'




async function loginUser(req: Request, res: Response) {
    const { body } = req
    const { username: email, password } = body
    if (!email || !password) {
        res.status(401).json({
            error: 'invalid user or password'
        })
        return
    }
    const user = await prisma.users.findUnique({
        where: {
            email: email
        }
    })

    const passwordCorrect =
        user === null
            ? false
            : await bcrypt.compare(password, user.password)

    if (!(user && passwordCorrect)) {
        res.status(401).json({
            error: 'invalid user or password'

        })
        return
    }
    const userForToken = {
        id: user._id,
        email: user.email
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET ?? 'default-secret',
        {
            expiresIn: 60 * 60 * 24
        }
    )
    res.send({
        name: user.name,
        email: user.email,
        id: user._id,
        token
    })
}

async function validLogin(req: Request, res: Response) {
    const { body } = req
    console.log('body', body)
    const { token } = body
    try {
        if (!process.env.SECRET) {
            throw new Error('Missing SECRET environment variable');
        }
        jwt.verify(token, process.env.SECRET)
        res.status(200)
        console.log('login validated')
    } catch (error) {
        res.send(201)
    }
}

export {
    loginUser,
    validLogin
}
