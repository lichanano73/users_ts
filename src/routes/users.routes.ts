import express from 'express';
import * as us_con from '../app/users.controllers';
//import * as us_serv from '../services/userServices';
import { isAdmin } from '../middlewares/auth';

const router = express.Router();

router.get('/',     isAdmin,  us_con.getAllUsers);
router.post('/add', isAdmin,  us_con.addUser);
router.put('/:id',  us_con.updateUser);

/* 
router.get('/', (_req,res)=>{
    console.log('Users /')
    const users_all = us_serv.getUsers();
    const users_noSensitive = us_serv.getNoSensitiveInfoUsers();
    return res.json({users_all: users_all, users_noSensitive: users_noSensitive});
})
*/


export default router;