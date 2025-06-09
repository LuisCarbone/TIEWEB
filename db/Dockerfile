# Imagen base de MariaDB
FROM mariadb:10.11

# Instalar herramientas adicionales (clientes y utils)
RUN apt-get update && \
	apt-get install -y mariadb-client && \
	rm -rf /var/lib/apt/lists/*

# Opcional: Copiar scripts SQL iniciales (ej. para crear tablas)
# COPY ./init-scripts/ /docker-entrypoint-initdb.d/