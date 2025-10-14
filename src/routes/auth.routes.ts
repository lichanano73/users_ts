import express from 'express';
import * as auth_c from '../app/auth.controllers'

const router = express.Router();

router.post('/',auth_c.login)
router.get('/ws_verifytoken',auth_c.verifyToken)

export default router;