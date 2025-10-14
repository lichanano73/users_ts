import express from 'express';
import authRouter from './auth.routes';
import usersRouter from './users.routes';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', verifyToken, usersRouter);

export default router;