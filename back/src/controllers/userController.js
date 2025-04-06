// controllers/userController.js
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import { generarToken, verificarCredenciales } from '../servicios/auth.js';
import dotenv from 'dotenv';
import path from 'path';


// Obtiene la ruta al directorio actual
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({path: path.join(__dirname, '../.env') });
dotenv.config( );

const UserController = {

	validarToken: async (req, res) => {

		console.log('entrando a validar token')
		const claveSecreta = process.env.CLAVE_TOKEN;
		const token = req.headers.authorization;

		// Verificar si se proporcionó un token en el encabezado de autorización
		if (!token) {
			return res.status(401).json({ error: 'Token no proporcionado' });
		}

		try {
			// Verificar la autenticidad del token utilizando la misma clave secreta con la que se firmó el token
			const decoded = await jwt.verify(token, claveSecreta);

			// Si el token es válido, devolver la información del usuario asociada al token
			return res.json(decoded.usuario);
		} catch (error) {
			// Si el token es inválido o ha expirado, devolver un error de autenticación
			return res.status(401).json({ error: 'Token inválido' });
		}
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		try {
			// Verifica las credenciales del usuario utilizando la función del módulo de autenticación
			const usuario = await verificarCredenciales(email, password);

			if (!usuario) {
				return res.status(401).json({ error: 'Credenciales incorrectas' });
			}

			// Genera un token JWT para el usuario autenticado utilizando la función del módulo de autenticación
			const token = generarToken(usuario);

		    // Crear una copia del usuario sin la contraseña
    		const usuarioSinPassword = usuario.toJSON();
			
    		delete usuarioSinPassword.password;

			// Devuelve el token JWT y la información del usuario (sin el campo de contraseña) en la respuesta
			res.json({ token, usuario: usuarioSinPassword });
		} catch (error) {
			console.error('Error de inicio de sesión:', error);
			res.status(500).json({ error: 'Error de servidor' });
		}
	},
	
	getAllUsers: async (req, res) => {
		try {
			const users = await User.findAll();
			res.status(200).json(users);
		} catch (error) {
			console.error(error);
			res.status(500).send('Error interno del servidor');
		}
	},

	getUserById: async (req, res) => {
		const userId = req.params.id;
		try {
			const user = await User.findByPk(userId);
			if (user) {
				res.json(user);
			} else {
				res.status(404).send('Usuario no encontrado');
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Error interno del servidor');
		}
	},

	createUser: async (req, res) => {
		const { name, lastname, user, email, password } = req.body;

		try {
			if (!name || !lastname || !user || !email || !password) {
				res.status(400).json({ error: "Missing data" })
			} else {
				const userexists = await UserModel.findOne({ where: { email } });
				if (userexists) {
					res.status(200).send('User already exists')
				} else {
					// Genera un salt (un valor aleatorio que se combina con la contraseña)
					const saltRounds = 10;
					const salt = await bcrypt.genSalt(saltRounds);

					// Hash de la contraseña con el salt
					const hashedPassword = await bcrypt.hash(password, salt);

					const newUser = await User.create({ name, lastname, user, email, password: hashedPassword });
					res.json(newUser);
				}
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Error interno del servidor');
		}
	},

	updateUser: async (req, res) => {
		const userId = req.params.id;
		const { name, lastname, user, email, password } = req.body;
		try {
			const user = await User.findByPk(userId);
			if (user) {
				await user.update({ name, lastname, user, email, password });
				res.json(user);
			} else {
				res.status(404).send('Usuario no encontrado');
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Error interno del servidor');
		}
	},

	deleteUser: async (req, res) => {
		const userId = req.params.id;
		try {
			const user = await User.findByPk(userId);
			if (user) {
				await user.destroy();
				res.json({ message: 'Usuario eliminado correctamente' });
			} else {
				res.status(404).send('Usuario no encontrado');
			}
		} catch (error) {
			console.error(error);
			res.status(500).send('Error interno del servidor');
		}
	},
};

export default UserController;
