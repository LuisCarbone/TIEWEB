import express from 'express';
import cors from 'cors';
import usersRouter from './routes/userRoutes.js'
import pmpRouter from './routes/pmpRoutes.js';
import paRouter from './routes/paRoutes.js';

import database from './db.js';

// Limpia la consola antes de iniciar
// process.stdout.write('\x1Bc');

const app = express();

app.use (express.json());
app.use (cors());

const corsOptions = {
    //origin: [ 'http://localhost:3000', 'https://travel-app-xi-smoky.vercel.app' ],
    origin: [ 'http://localhost:3000' ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: ['Content-Type'] ,
}

usersRouter.use(cors(corsOptions));
pmpRouter.use(cors(corsOptions));
paRouter.use(cors(corsOptions));

app.use('/users', usersRouter);
app.use('/calificaciones', pmpRouter);
app.use('/calificaciones', paRouter);


database.sync({force : false }).then(() => {
    console.log('Base de datos conectada');

    app.listen(3000, () => {
        console.log('listening on port 3000');
    })
});

