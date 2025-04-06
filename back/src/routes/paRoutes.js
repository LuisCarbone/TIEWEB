import express from 'express';
import PaController from '../controllers/paController.js';

const paRouter = express.Router();

paRouter.post('/byParcial', PaController.getParcAlumnosByID_Parcial);

export default paRouter;