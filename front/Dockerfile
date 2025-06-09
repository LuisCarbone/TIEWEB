FROM node:22-alpine

WORKDIR /usr/src/app  

COPY package*.json ./  

RUN npm install  && \
    npm install react-bootstrap bootstrap

COPY . .  

# EXPOSE 5173 Usual para Vite/React  el comentario va en otra linea porque Docker no acepta comentarios en la misma linea
EXPOSE 5173  

CMD ["npm", "run", "dev"]  