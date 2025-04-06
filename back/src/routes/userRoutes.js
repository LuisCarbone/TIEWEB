// routes/userRoutes.js
import express from 'express';
import userController from '../controllers/userController.js';

const usersRouter = express.Router();

// Rutas para gestionar usuarios
usersRouter.post('/login', userController.login);
usersRouter.post('/validarToken', userController.validarToken);
usersRouter.get('/', userController.getAllUsers);
usersRouter.get('/:id', userController.getUserById);
usersRouter.post('/', userController.createUser);
usersRouter.put('/:id', userController.updateUser);
usersRouter.delete('/:id', userController.deleteUser);

export default usersRouter;
