const Contact = require('./../models/contact.model');
const { getDate } = require('./utils');

const contactGetAll = async (req, res, next) => {
    try {
        const contacts = await Contact.find();
        console.log(contacts);
        return res.status(200).json(contacts);
    } catch (err) {
        return next(err);
    }
}

const contactGetOne = async (req, res, next) => {
    try {
        const { id } = req.params;
        const contact = await Contact.findById(id);
        return res.status(200).json(contact);
    } catch (err) {
        return next(err);
    }
}

const contactFindByEmail = async (req, res, next) => {
    try {
        const { email } = req.params;
        const contact = await Contact.find({ email: email });
        return res.status(200).json(contact);
    } catch (err) {
        return next(err);
    }
}

const contactGetOwners = async (req, res, next) => {
    try {
        const owners = await Contact.find({ tag: "Propietario" });
        console.log(owners);
        return res.status(200).json(owners);
    } catch (err) {
        return next(err);
    }
}

const contactCreate = async (req, res, next) => {
    console.log(req.body);
    try {
        const {
            fullName,
            tag,
            email,
            mobileNumber,
            phoneNumber,
            company,
            street,
            directionNumber,
            directionFloor,
            postalCode,
            city,
            country,
            comments,
            communications,
        } = req.body;

        let lastReference = await Contact.find().sort({ createdAt: -1 }).limit(1);
        console.log(lastReference);

        const contactDirection = {
            address: {
                street: street,
                directionNumber: directionNumber,
                directionFloor: directionFloor,
            },
            postalCode: postalCode,
            city: city,
            country: country
        };

        const newContact = new Contact({
            contactCreationDate: getDate(),
            fullName: fullName,
            tag: tag,
            email: email,
            contactMobileNumber: mobileNumber,
            contactPhoneNumber: phoneNumber,
            company: company,
            contactDirection: contactDirection,
            contactComments: comments,
            notReceiveCommunications: communications,
        })

        const contactCreated = await newContact.save();

        return res.status(200).json(contactCreated);

    } catch (err) {
        return next(err);
    }
}

const contactDelete = async (req, res, next) => {
    try {
        const { id } = req.params;
        let response = "";

        const deleted = await Contact.findByIdAndDelete(id);
        if (deleted) response = "Contacto borrado de la base de datos";
        else response = "No se ha podido encontrar este contact. ¿Estás seguro de que existe?";

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    contactGetAll,
    contactGetOne,
    contactFindByEmail,
    contactGetOwners,
    contactCreate,
    contactDelete,
}