import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prismaClient as prisma } from '../prismaClient'



async function loginUser(request, response) {
    const { body } = request
    const { username: email, password } = body
    if (!email || !password) {
        response.status(401).json({
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
        response.status(401).json({
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
        process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24
        }
    )
    response.send({
        name: user.name,
        email: user.email,
        id: user._id,
        token
    })
}

async function validLogin(request, response) {
    const { body } = request
    console.log('body', body)
    const { token } = body
    try {
        jwt.verify(token, process.env.SECRET)
        response.send(true)
        console.log('login validated')
    } catch (error) {
        response.send(false)
    }
}

export {
    loginUser,
    validLogin
}
