import express from 'express';
import * as us_con from '../app/users.controllers';
//import * as us_serv from '../services/userServices';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/', verifyToken, us_con.getAllUsers);
router.post('/add', us_con.addUser);

/* 
router.get('/', (_req,res)=>{
    console.log('Users /')
    const users_all = us_serv.getUsers();
    const users_noSensitive = us_serv.getNoSensitiveInfoUsers();
    return res.json({users_all: users_all, users_noSensitive: users_noSensitive});
})
*/


export default router;