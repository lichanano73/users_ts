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

/* ============================
   UPDATE USER: PUT /users/:id
   ============================ */
const UpdateUserSchema = UserSchema.partial(); // todos opcionales

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: 'ID inválido' });

    // Validación (parcial)
    const parsed = UpdateUserSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: 'Ocurrió un error al validar el esquema',
        details: parsed.error.errors,
      });
    }

    const userData = parsed.data;    

    // - Admin:    puede actualizar a cualquiera.
    // - No admin: solo puede actualizarse a sí mismo.
    if (res.locals.user.type !== 'admin' && res.locals.user.id !== id) {
      return res.status(403).json({ error: 'No tienes permiso para actualizar este usuario' });
    }

    const user = await UserModel.findByPk(id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // No permitir cambiar id explícitamente si llegara en el body
    // @ts-ignore
    if ('id' in userData)       delete userData.id;
    if ('email' in userData)    delete userData.email;
    if ('password' in userData) delete userData.password;
    if ('type' in userData)     delete userData.type;

    await user.update(userData);

    const { password, ...clean } = user.toJSON();
    const result_user: OmitSensitiveInfoUser = clean;

    return res.status(200).json(result_user);

  } catch (error: any) {

    const status = error.status || 500;
    return res.status(status).json({ error: error || 'Error interno' });
    
  }
};