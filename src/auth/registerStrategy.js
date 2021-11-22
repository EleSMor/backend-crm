const LocalStrategy = require('passport-local').Strategy;
const Consultant = require('../models/consultant.model');
const bcrypt = require('bcrypt');
const { isValidPassword, isValidEmail } = require('./utils');
const { getDate } = require('../controllers/utils');

/**************************************
 * Register Consultant Strategy
 *************************************/

const registerStrategy = new LocalStrategy(
    {
        usernameField: 'consultantEmail',
        passwordField: 'consultantPassword',
        passReqToCallback: true,
    },

    async (req, consultantEmail, consultantPassword, done) => {

        try {
            const { fullName, consultantMobileNumber, consultantPhoneNumber, position, profession, office1, office2, comments } = req.body

            const existingEmail = await Consultant.findOne({ consultantEmail });
            if (existingEmail) {
                const error = new Error("Este correo ya se encuentra en nuestra base de datos");
                error.status = 400;
                return done(error);
            }

            const existingMobile = await Consultant.findOne({ consultantMobileNumber });
            if (existingMobile) {
                const error = new Error("Este teléfono móvil ya se encuentra en nuestra base de datos");
                error.status = 400;
                return done(error);
            }

            if (!isValidEmail(consultantEmail)) {
                const error = new Error('Formato de correo inválido');
                error.status = 400;
                return done(error);
            }

            if (!isValidPassword(consultantPassword)) {
                const error = new Error('La contraseña debe contener al menos entre 8 y 16 carácteres, 1 mayúscula, 1 minúscula y 1 dígito')
                error.status = 400;
                return done(error);
            }
            
            const avatar = req.files.avatar ? req.files.avatar[0].location : "";
            const companyUnitLogo = req.files.companyUnitLogo ? req.files.companyUnitLogo[0].location : '';

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(consultantPassword, saltRounds);

            const newConsultant = new Consultant({
                consultantEmail,
                consultantPassword: passwordHash,
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
                consultantComments: comments,
            })

            console.log(newConsultant);
            const savedConsultant = await newConsultant.save();
            savedConsultant.password = null;

            return done(null, savedConsultant);

        } catch (error) {
            return done(error);
        }
    },
);


module.exports = registerStrategy;