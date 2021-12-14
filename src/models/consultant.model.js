const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const consultantSchema = new Schema({
    role: { type: String, enum: ["Admin", "Consultor", "SuperAdmin"], default: "Consultor" },
    fullName: { type: String },
    consultantEmail: { type: String, required: true },
    consultantPassword: { type: String, required: true },
    consultantCreationDate: { type: String },
    avatar: { type: String },
    companyUnitLogo: { type: String },
    consultantMobileNumber: { type: String },
    consultantPhoneNumber: { type: String },
    position: { type: String },
    profession: { type: String },
    office1: { type: String },
    office2: { type: String },
    consultantComments: { type: String },
    ads: { type: mongoose.Types.ObjectId, ref: 'ads' },
},
    {
        timestamps: true
    }
)

const Consultant = mongoose.model('consultants', consultantSchema);

module.exports = Consultant;