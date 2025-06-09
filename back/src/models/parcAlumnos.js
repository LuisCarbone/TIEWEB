
import { DataTypes } from "sequelize";
import database from "../db.js";

const ParcAlumnos = database.define('ParcialesAlumnos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_parcial: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_parcial_alumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    id_alumno: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    documento:{
        type:DataTypes.STRING(255),
        allowNull: false,
    },
    alumno: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    parcial_1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parcial_2: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parcial_3: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    parcial_4: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    promedio : {
        type: DataTypes.STRING,
        allowNull: true,
    },
    calificacion: {
        type: DataTypes.STRING(5),
        allowNull: true,
    },
    trayectoria: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    observaciones: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    saberes_pendientes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, 
{
    tableName: 'ParcialesAlumnos'
});

ParcAlumnos.sync( { force: true });

export default ParcAlumnos;