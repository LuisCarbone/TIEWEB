import path from 'path';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

// Obtiene la ruta al directorio actual
// const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Carga las variables de entorno desde el archivo .env
// dotenv.config({path: path.join(__dirname, '../../../.env') });
dotenv.config();

// Obtiene las variables de entorno
//const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

console.log (DB_HOST, DB_USER, DB_PASSWORD, DB_NAME)

// Configura la conexión a la base de datos MariaDB
const connection = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

// Función para encriptar las contraseñas utilizando bcrypt
const encriptarContraseñas = async () => {
  try {
    // Obtiene todos los usuarios de la base de datos
    const [rows] = await connection.execute('SELECT * FROM users');

    // Itera sobre cada usuario y encripta su contraseña utilizando bcrypt
    for (const usuario of rows) {
      const hash = await bcrypt.hash(usuario.password, 10); // Utiliza un salt de 10 para la encriptación
      await connection.execute('UPDATE users SET password = ? WHERE id = ?', [hash, usuario.id]);
    }

    console.log('Todas las contraseñas han sido encriptadas exitosamente.');
    process.exit(0); // Sale del script una vez completado
  } catch (error) {
    console.error('Error al encriptar las contraseñas:', error);
    process.exit(1); // Sale del script con un código de error
  } finally {
    await connection.end(); // Cierra la conexión a la base de datos
  }
};

// Ejecuta la función para encriptar las contraseñas
encriptarContraseñas();
