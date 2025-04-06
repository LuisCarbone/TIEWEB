import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mariadb from 'mariadb';

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const database = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mariadb',
  dialectModule: mariadb,
  logging: false,
});

export default database ;