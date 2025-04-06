import ParcAlumnosModel from "../models/parcAlumnos.js";

const PaController = {
    getAllParcAlumnos: async (req, res) => {
        try {
            const pmp = await ParcAlumnosModel.findAll();
            res.status(200).json(pmp);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    getParcAlumnosByID_Parcial: async (req, res) => {
        const { id_parcial } = req.body;

        console.log (req.body);
        try {
            const pmp = await ParcAlumnosModel.findAll({ where: { id_parcial }});
            res.status(200).json(pmp);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
};

export default PaController;