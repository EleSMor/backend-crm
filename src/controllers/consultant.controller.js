const Consultant = require('./../models/consultant.model');
const { getDate } = require('./utils');

const consultantGetAll = async (req, res, next) => {
    try {
        const consultants = await Consultant.find();
        return res.status(200).json(consultants);
    } catch (err) {
        return next(err);
    }
};

const consultantGetOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const consultant = await Consultant.findById(id);
        return res.status(200).json(consultant);
    } catch (err) {
        return next(err);
    }
};

const consultantCreate = async (req, res, next) => {

    try {
        const {
            consultantEmail,
            consultantPassword,
            fullName,
            consultantMobileNumber,
            consultantPhoneNumber,
            position,
            profession,
            office1,
            office2,
            comments
        } = req.body;

        const avatar = req.files.avatar[0] ? req.files.avatar[0].location : "";
        const companyUnitLogo = req.files.companyUnitLogo[0] ? req.files.companyUnitLogo[0].location : '';

        const newConsultant = new Consultant({
            consultantEmail,
            consultantPassword,
            consultantCreationDate: getDate(),
            fullName,
            avatar,
            companyUnitLogo,
            consultantMobileNumber,
            consultantPhoneNumber,
            position,
            profession,
            office1,
            office2,
            consultantComments: comments
        })

        const consultantCreated = await newConsultant.save();

        return res.status(200).json(consultantCreated);
    } catch (err) {
        return next(err);
    }
}

const consultantDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = "";

        const deleted = await Consultant.findByIdAndDelete(id);
        if (deleted) response = "Consultor borrado de la base de datos";
        else response = "No se ha podido encontrar este consultor. ¿Estás seguro de que existe?";

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    consultantGetAll,
    consultantGetOne,
    consultantCreate,
    consultantDelete
}