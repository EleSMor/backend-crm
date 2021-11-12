const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consultantSchema = new Schema({
    role: { type: String, enum: ["Admin", "Consultor"], default: "Consultor" },
    fullName: { type: String },
    consultantEmail: { type: String, required: true },
    consultantPassword: { type: String, required: true },
    consultantCreationDate: { type: Date },
    avatar: { type: String },
    businessUnitLogo: { type: String },
    consultantMobileNumber: { type: String },
    consultantPhoneNumber: { type: String },
    position: { type: String },
    occupation: { type: String },
    office1: { type: String },
    office2: { type: String },
    consultantComments: { type: String },
    ads: { type: mongoose.Types.ObjectId, ref: 'ads' },
},
    {
        timestamp: true
    }
)

const Consultant = mongoose.model('consultants', consultantSchema);

module.exports = Consultant;