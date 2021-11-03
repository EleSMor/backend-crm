const Consultant = require('./../models/consultant.model');

const consultantGetAll = async (req, res, next) => {
    try {
        const consultants = await Consultant.find();
        return res.status(200).json(consultants);
    } catch (err) {
        return next(err);
    }
};

// const consultantCreate = async (req, res, next) => {
//     try {
//         // const { nombres de las variables en html } = req.body;
//         // const newConsultant = new Consultant({

//         // })
//     }
// }

module.exports = {
    consultantGetAll,

}