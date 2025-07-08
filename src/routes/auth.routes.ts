import express from 'express';

const router = express.Router();

router.get('/', (_req,res)=>{
    console.log('api/auth')
    return res.send('api/auth');
})


export default router;