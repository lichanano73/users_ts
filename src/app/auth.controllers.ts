import { Request, Response } from "express"
import UserModel from "../models/users.model"
import { LoginSchema } from "../validators/auth.validator"
import { NonSensitiveInfoUserShema } from "../validators/user.validator"

import config from '../config/config';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

/*  */

export const login = async (req: Request, res: Response) => {

  try {

    const  validator = LoginSchema.safeParse(req.body)

    if (!validator.success) throw {
      message: 'Ocurrió un error al validar el esquema',
      details: validator.error.errors,
    }  

    const loginData = validator.data;
    
    const myUser = await UserModel.findOne({ where: { email: loginData.email }});
    if (!myUser) throw { status: 404, message: 'Usuario no encontrado' }    
    if (myUser.dataValues.email_confirmado == false) throw { 
      status:  400, 
      message: 'Error en confirmación de email. Revise su casilla o solicite recuperación de cuenta.' 
    }

    const user_result = myUser.dataValues

    const match = await bcrypt.compare(loginData.password, user_result.password)
    if(!match) throw { status: 401, message: 'Password incorrecto' }

    const result_user = NonSensitiveInfoUserShema.safeParse(user_result);
    if (!result_user.success) throw {
      message: 'Ocurrió un error al validar el esquema',
      details: result_user.error.errors,
    }  

    const token_generate = jwt.sign({ id: user_result.id }, config.jwt_secret, { expiresIn: '24h' })

    return res.status(200).json({
      usuario: result_user.data,
      token:   token_generate,
    });

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