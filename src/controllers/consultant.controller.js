const Consultant = require('./../models/consultant.model');
const bcrypt = require('bcrypt');
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
        const avatar = req.files.avatar[0] ? req.files.avatar[0].location : "";
        const companyUnitLogo = req.files.companyUnitLogo[0] ? req.files.companyUnitLogo[0].location : '';

        const newConsultant = new Consultant({
            consultantEmail: req.body.consultantEmail,
            consultantPassword: req.body.consultantPassword,
            fullName: req.body.fullName,
            avatar,
            companyUnitLogo,
            consultantMobileNumber: req.body.consultantMobileNumber,
            consultantPhoneNumber: req.body.consultantPhoneNumber,
            position: req.body.position,
            profession: req.body.profession,
            office1: req.body.office1,
            office2: req.body.office2,
            consultantComments: req.body.comments
        })

        const consultantCreated = await newConsultant.save();

        return res.status(200).json(consultantCreated);
    } catch (err) {
        return next(err);
    }
}

const consultantUpdate = async (req, res, next) => {

    try {
        const fieldsToUpdate = {};

        const consultant = await Consultant.findById(id)
        const isValidPassword = await bcrypt.compare(req.body.consultantPassword, consultant.consultantPassword);

        if (!isValidPassword) {
            fieldsToUpdate.consultantPassword = await bcrypt.hash(req.body.consultantPassword, 10);
        } else { fieldsToUpdate.consultantPassword = req.body.consultantPassword }

        fieldsToUpdate.consultantEmail = req.body.consultantEmail
        fieldsToUpdate.fullName = req.body.fullName
        fieldsToUpdate.consultantMobileNumber = req.body.consultantMobileNumber
        fieldsToUpdate.consultantPhoneNumber = req.body.consultantPhoneNumber
        fieldsToUpdate.position = req.body.position
        fieldsToUpdate.profession = req.body.profession
        fieldsToUpdate.office1 = req.body.office1
        fieldsToUpdate.office2 = req.body.office2
        fieldsToUpdate.consultantComments = req.body.comments

        if (Object.entries(req.files).length !== 0) {
            fieldsToUpdate.avatar = req.files.avatar ? req.files.avatar[0].location : "";
            fieldsToUpdate.companyUnitLogo = req.files.companyUnitLogo ? req.files.companyUnitLogo[0].location : '';
        }

        const updatedConsultant = await Consultant.findByIdAndUpdate(req.body.id, fieldsToUpdate, { new: true })
        updatedConsultant.password = null;

        return res.status(200).json(updatedConsultant);
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
    consultantUpdate,
    consultantCreate,
    consultantDelete
}