import { RequestHandler } from 'express';
import jwt from "jsonwebtoken";
import UserModel from '../models/users.model';
import config from "../config/config";

export const verifyToken: RequestHandler = async (req, res, next) => {
  console.log('--- Middleware verifyToken ---')
  try {
    const authHeader = req.headers.authorization
    if (!authHeader?.startsWith('Bearer ')) throw { status: 401, message: 'Token no proporcionado' }

    const token   = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, config.jwt_secret as string) as { id: number, email: string }

    console.log('decoded', decoded)

    if (!decoded.id) throw { status: 401, message: 'Token inválido' }

    const myUser = await UserModel.findOne({ where: { id: decoded.id } })
    if (!myUser) throw { status: 500, message: 'Usuario no encontrado' }  

    return next();

  } catch (error: any) {
    const status = error.status || 500
    return res.status(status).json({ error: error || 'Token inválido' })
  }
};