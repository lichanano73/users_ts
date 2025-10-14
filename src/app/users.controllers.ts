import { Request, Response } from 'express';
import UserModel from '../models/users.model';
import { OmitSensitiveInfoUser } from '../types';

import bcrypt from 'bcrypt';
import { UserSchema } from '../validators/user.validator';

export const getAllUsers = async (req: Request, res: Response) => {
  try {

    // Pagination and filters 
    const { page = 1, limit = 10, email = "" } = req.query;
    const offset = (Number(page) - 1) * Number(limit);

    const whereClause = email ? { email: email } : {};

    const users = await UserModel.findAll({
      where:      whereClause,
      attributes: ['id', 'first_name', 'email', 'avatar', 'birth'],
      limit:      Number(limit),
      offset:     offset,
    });

    return res.status(200).json(users);

  } catch (error: any) {
    const status = error.status || 500
    return res.status(status).json({ error: error || 'Error interno' })
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {

    // Validar esquema
    const validator = UserSchema.safeParse(req.body);

    if (!validator.success) throw {
      message: 'Ocurrió un error al validar el esquema',
      details: validator.error.errors,
    }

    const userData = validator.data;
    
    const existing = await UserModel.findOne({ where: { email: userData.email } });
    if (existing) throw { status: 409, message: 'El email ya está registrado' };

    //Hash -> Add -> Return
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const result = await UserModel.create({
      ...userData,
      password: hashedPassword,
    })
    
    const { password, ...nw_user } = result.toJSON();
    const result_user: OmitSensitiveInfoUser = nw_user;
        
    return res.status(201).json(result_user);

  } catch (error: any) {
    const status = error.status || 500
    return res.status(status).json({ error: error || 'Error interno' })
  }
};