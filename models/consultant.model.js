const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consultantSchema = new Schema({
    consultantReference: { type: String },
    role: { type: String, enum: ["Admin", "Consultor"], default: "Consultor"},
    consultorCreationDate: { type: Date },
    avatar: { type: String },
    businessUnitLogo: { type: String },
    fullName: { type: String },
    consultantEmail: { type: String },
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