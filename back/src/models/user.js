import { DataTypes } from "sequelize";
import database from "../db.js";

const User = database.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    user:{
        type: DataTypes.STRING,
        allowNull: false,
        unique:true,
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isAlumno: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isDocente: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isResponsableDePago: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      isFamiliarDelAlumno: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }    
}, {
    tableName: 'users'
});

User.sync( { force: false });

export default User;

