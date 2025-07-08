import { Request, Response } from 'express';
import UserModel from '../models/users.model';
import { UserEntry } from '../types';

import bcrypt from 'bcrypt';
import { UserSchema } from '../validators/user.validator';

export const getAllUsers = async (_req: Request, res: Response) => {
  try {

    const users = await UserModel.findAll({
      attributes: ['id', 'first_name', 'email', 'avatar'],
    });

    return res.status(200).json(users);

  } catch (error: any) {
    console.error('Error al obtener usuarios:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {

    // Validar esquema
    const validator = UserSchema.safeParse(req.body);

    if (!validator.success) {
      return res.status(400).json({
        error:    'Ocurrió un error al validar el esquema',
        details:  validator.error.errors,
      });
    }

    const userData = validator.data;
    
    const existing = await UserModel.findOne({ where: { email: userData.email } });
    if (existing)    throw { status: 409, message: 'El email ya está registrado' };

    //Hash -> Add -> Return
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await UserModel.create({
      ...userData,
      password: hashedPassword,
    })
    
    const myUser: UserEntry = result.toJSON();
    const { password, ...userSinPass } = myUser;
    
    return res.status(201).json(userSinPass);

  } catch (err: any) {
    const status = err.status || 500;
    return res.status(status).json({ error: err.message || 'Error interno' });
  }
};