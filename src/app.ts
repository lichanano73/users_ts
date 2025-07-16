import express from 'express';
import api_routes from './routes/api.routes';

const app = express();
app.use(express.json());

app.get('/',(_req,res)=>{
    console.log('/');
    return res.json({
        mensaje:        '👋 Bienvenido al microservicio Users_ts',
        descripcion:    'API para gestión de usuarios con verificación, registro y seguridad.',
        version:        '0.0.1',
        //endpoints_utiles: [
            //{ metodo: 'GET', ruta: '/api/users' },
            //{ metodo: 'POST', ruta: '/api/users/register' }
        //],
        estado: '✅ activo'
    });
});

app.use('/api', api_routes);

app.use((_req,res)=>{
    console.log('/404');
    return res.json({ mensaje: 'Respuesta 404 '});
});

export default app;