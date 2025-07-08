import express from 'express';
import api_routes from './routes/api_routes';

const app = express();
app.use(express.json());

app.get('/',(_req,res)=>{
    console.log('/');
    return res.json({ mensaje: "Bienvenidos a la api ts", version: "0.0.1"});
});

app.use('/api', api_routes);

export default app;