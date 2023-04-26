import jwt from 'jsonwebtoken'
import User from "../models/User.js";

const webToken = {}

//get token 
webToken.generateToken = async (user) => {
    console.log(user)

    const payload = {
        id:user._id,
        rol:user.role,
        name:user.name,
        }
        console.log(payload)

    try{
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET, 
        { 
            expiresIn: '30D',
            algorithm: 'HS256',
        })

    console.log(token)
    return token
    } catch (err) {
        console.log(err)
        throw new Error('Error al generar el token')
    }
}

//validate token
webToken.validateToken = async (token) => {
    try {
        if (!token) {
            throw new Error()
        }
    }catch (err) {
        throw new Error('No se ha enviado el token')
    }
    
    try {
        const result = jwt.verify(
            token, 
            process.env.JWT_SECRET,
            { algorithm: 'HS256' }
            )
        console.log(result)

        let user = await User.findById(result.id)

        if (!user) throw new Error(user)

        if (user.status !== 0) throw new Error('el usuario está inactivo')

    } catch (err) {
        throw new Error('Token invalido')
    }
}




export default webToken