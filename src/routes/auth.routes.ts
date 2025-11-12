import express from 'express';
import * as auth_c from '../app/auth.controllers'

const router = express.Router();

router.post('/',auth_c.login)                       // ✅ 1.1 Login
router.get('/ws_verifytoken',auth_c.verifyToken)    // ✅ 1.2 Verify Token

export default router;