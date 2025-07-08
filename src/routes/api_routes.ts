import express from 'express';
import usersRouter from './users_routes';
import authRouter from './auth_routes';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;