import { User } from '../models/user.model.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import { StatusHttp } from '../libs/statusHttp.js'

async function login(email, password){
    const userFound = await User.findOne({email})

    if(!userFound) throw new StatusHttp('Credenciales inválidas', 400)

    const isValidPassword = await bcrypt.compare(password, userFound.password)

    if(!isValidPassword) throw new StatusHttp('Credenciales inválidas', 400)

    return jwt.sign({id: userFound._id})
}

export{ login }