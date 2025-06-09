# Usa una imagen base de Node.js
FROM node:22.14.0

# Crea un directorio para la aplicación
WORKDIR /usr/src/app

# Copia los archivos de configuración (package.json, package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto donde corre la aplicación (ej. 3000 para Express)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]