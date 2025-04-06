import crypto from 'crypto';

// Genera una clave secreta aleatoria de 32 bytes
const claveSecreta = crypto.randomBytes(32).toString('hex');

console.log('Clave secreta generada:', claveSecreta);