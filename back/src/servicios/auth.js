// auth.js - Módulo para la gestión de autenticación y tokens JWT
import path from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';
import dotenv from 'dotenv';

// Obtiene la ruta al directorio actual
const __dirname = path.dirname(new URL(import.meta.url).pathname);
dotenv.config({path: path.join(__dirname, '../../.env') });
dotenv.config( );

const generarToken = (usuario) => {
	const claveSecreta = process.env.CLAVE_TOKEN;

	// Crea un token JWT con el ID del usuario como carga útil (payload)
	return jwt.sign({ userId: usuario.id }, claveSecreta, { expiresIn: '1h' });
};


const verificarCredenciales = async (email, password) => {
	
	// Busca un usuario en la base de datos con el correo electrónico proporcionado
	const usuario = await User.findOne({ where: {email} });
	
	// Si no se encuentra ningún usuario con el correo electrónico proporcionado, devuelve null
	if (!usuario) {
		return null;
	}

	// Verifica si la contraseña proporcionada coincide con la contraseña almacenada en la base de datos
	const contraseñaValida = await bcrypt.compare(password, usuario.password);

	// Si la contraseña no es válida, devuelve null
	if (!contraseñaValida) {
		return null;
	}

	// Si las credenciales son válidas, devuelve el objeto de usuario
	return usuario;
}

export { generarToken, verificarCredenciales };
