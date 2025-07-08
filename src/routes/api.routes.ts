import express from 'express';
import authRouter from './auth.routes';
import usersRouter from './users.routes';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;