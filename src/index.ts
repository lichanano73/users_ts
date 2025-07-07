import express from 'express';
import usersRouter from './routes/api_users';

const app = express();
app.use(express.json());
const PORT = 8000;

app.get('/',(_req,res)=>{
    console.log('/');
    return res.json({ mensaje: "Bienvenidos a la api ts", version: "0.0.1"});
})

app.use('/users', usersRouter);

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en port ${PORT}`);
})