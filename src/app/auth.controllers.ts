import { Request, Response } from "express"
import UserModel from "../models/users.model"
import { LoginSchema } from "../validators/auth.validator"

import bcrypt from "bcrypt"

export const login = async (req: Request, res: Response) => {

  try {

    const  validator = LoginSchema.safeParse(req.body)

    if (!validator.success) throw {
      message: 'Ocurrió un error al validar el esquema',
      details: validator.error.errors,
    }  

    const loginData = validator.data;

    const myUser = await UserModel.findOne({ where: { email: loginData.email } })
    if (!myUser) throw { status: 409, message: 'Usuario no encontrado' }

    if (myUser.dataValues.email_confirmado == false) throw { 
      status:  400, 
      message: 'Error en confirmación de email. Revise su casilla o solicite recuperación de cuenta.' 
    }

    const match = await bcrypt.compare(loginData.password, myUser.dataValues.password)

    if(!match) throw { status: 409, message: 'Password incorrecto' }

    return res.json('Login OK')

  } catch (error: any) {
    const status = error.status || 500
    return res.status(status).json({ error: error || 'Error interno' })
  }
}

export const logout = async (_req:Request, res:Response) => {
  try {

    return res.json('Soy Logout')
    
  } catch (error: any) {
    const status = error.status || 500;
    return res.status(status).json({ error: error.message || 'Error interno' });
  }
}