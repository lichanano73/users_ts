import express from 'express';
import usersRouter from './users.routes';
import authRouter from './auth.routes';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/auth', authRouter);

export default router;