import app from './app';
import config from './config/config';
import { connectDB } from './config/database';

connectDB(); 

app.listen(config.port,()=>{       
    console.log(`Servidor corriendo en port ${config.port}`);    
})