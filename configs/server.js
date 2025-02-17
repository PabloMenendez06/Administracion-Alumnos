import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConection } from './mongo.js';
import limiter from '../src/middlewares/validar-cant-peticiones.js';
import authRoutes from '../src/auth/auth.routes.js'; // Importamos las rutas de autenticación

const middlewares = (app) => {
    app.use(express.urlencoded({ extended: false }));
    app.use(cors());
    app.use(express.json());
    app.use(helmet());
    app.use(morgan('dev'));
    app.use(limiter);
};

const routes = (app) => {
    app.use('/Admin-Alumnos/v1/auth', authRoutes); // Usamos las rutas de autenticación
};

const conectarDB = async () => {
    try {
        await dbConection();
        console.log("Conexión a la base de datos exitosa");
    } catch (error) {
        console.error('Error conectando a la base de datos', error);
        process.exit(1);
    }
};

export const initServer = async () => {
    const app = express();
    const port = process.env.PORT || 3001;

    try {
        middlewares(app);
        conectarDB();
        routes(app); // Usamos las rutas generales
        app.listen(port);
        console.log(`Server running on port: ${port}`);
    } catch (err) {
        console.log(`Server init failed: ${err}`);
    }
};
