import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prismaClient as prisma } from '../prismaClient'



async function loginUser(request, response) {
    const { body } = request
    console.log('loginUser en controller', body)
    const { username: email, password } = body
    console.log('email', email, 'password', password)
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
    console.log('después de chekear si es correcto')
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
    console.log('llegando al final de la función')
    response.send({
        name: user.name,
        email: user.email,
        id: user._id,
        token
    })
    console.log('saliendo de la función')
}

async function validLogin(request, response) {
    console.log('validLogin en controller')
    const { body } = request
    console.log('body', body)
    const { token } = body
    console.log('validLogin en controller', token)
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
