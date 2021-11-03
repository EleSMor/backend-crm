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
            postalCode,
            city,
            country,
            comments,
            communications,
        } = req.body;

        let lastReference = await Contact.find().sort({ createdAt: -1 }).limit(1);
        console.log(lastReference);

        const contactDirection = { street, postalCode, city, country };

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

module.exports = {
    contactGetAll,
    contactCreate,
}