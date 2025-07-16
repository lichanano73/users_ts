import express from 'express';
import * as auth_c from '../app/auth.controllers'

const router = express.Router();

router.post('/login',auth_c.login)
router.post('/logout',auth_c.logout)

export default router;