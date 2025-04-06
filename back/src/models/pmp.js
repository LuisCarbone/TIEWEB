/*
select	pmp.id_parcial,
        pmp.id_periodo, 
        pmp.email_docente, 
        sd.correlatividadcompleta, 
        sd.nivel_educativo, 
        sd.saladivision, 
        sd.padresubnivel, 
        ms.materia

from	usr.parciales_materias_periodo pmp,
	tie.v_materias_secciones ms,
	tie.vw_salasdivisiones	sd
where	pmp.id_periodo = 51
and	ms.id_materia_seccion = pmp.id_materia_seccion
and	sd.id_saladivision = ms.id_saladivision
order by pmp.email_docente,  sd.correlatividadcompleta, sd.saladivision , ms.materia
*/

import { DataTypes } from "sequelize";
import database from "../db.js";

const Pmp = database.define('ParcialesMateriasPeriodo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    id_parcial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true        
    },
    id_periodo: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    email_docente: {
        type: DataTypes.STRING,
        isEmail: true,
        allowNull: false
    }, 
    correlatividadcompleta: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    nivel_educativo: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    saladivision: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    padresubnivel: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    materia: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'ParcialesMateriasPeriodo'
});

export default Pmp;