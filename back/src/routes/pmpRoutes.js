// routes/pmpRoutes.js
import express from 'express';
import pmpController from '../controllers/pmpController.js';

const pmpRouter = express.Router();

// Rutas para gestionar usuarios
pmpRouter.get('/', pmpController.getAllPMP);
pmpRouter.post('/byEmail', pmpController.getByEmail);

//pmpRouter.get('/:id', pmpController.getPMPById);
//pmpRouter.post('/', pmpController.createPMP);
//pmpRouter.put('/:id', pmpController.updatePMP);
//pmpRouter.delete('/:id', pmpController.deletePMP);

export default pmpRouter;
