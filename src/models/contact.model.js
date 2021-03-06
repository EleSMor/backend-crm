const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    contactReference: { type: Number, required: true },
    contactCreationDate: { type: String },
    fullName: { type: String },
    tag: [{ type: String, enum: ["Cliente", "Propietario"], required: true }],
    email: { type: String },
    contactMobileNumber: { type: String },
    contactPhoneNumber: { type: String },
    company: { type: String },
    contactDirection: {
        street: { type: String, required: true },
        postalCode: { type: String, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true }
    },
    contactComments: { type: String },
    notReceiveCommunications: { type: Boolean },
    requests: { type: mongoose.Types.ObjectId },
},
    {
        timestamp: true
    }
)

const Contact = mongoose.model('contacts', contactSchema);

module.exports = Contact;