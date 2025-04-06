import PmpModel from '../models/pmp.js';

const PmpController = {
    getAllPMP: async (req, res) => {
        try {
            const pmp = await PmpModel.findAll();
            res.status(200).json(pmp);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    },
    
    getByEmail: async (req, res) => {
        const { email } = req.body;

        console.log (req.body);
        try {
            const pmp = await PmpModel.findAll ( { where: { email_docente: email} });
            res.status(200).json(pmp);
        } catch (error) {
            console.error(error);
            res.status(500).send('Error interno del servidor');
        }
    }
}

export default PmpController;