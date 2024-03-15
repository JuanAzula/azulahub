import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prismaClient as prisma } from '../prismaClient'



async function loginUser(request, response) {
    const { body } = request
    console.log('loginUser en controller', body)
    const { email, password } = body

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
        username: user.username
    }

    const token = jwt.sign(
        userForToken,
        process.env.SECRET,
        {
            expiresIn: 60 * 60 * 24 * 7
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

export {
    loginUser
}
