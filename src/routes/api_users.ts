import express from 'express';
import users_data from '../services/users_data.json';

const router = express.Router();

router.get('/', (_req,res)=>{
    console.log('Users /')
    return res.json(users_data)
})


export default router;