const LocalStrategy = require('passport-local').Strategy;
const Consultant = require('../models/Consultant.model');
const bcrypt = require('bcrypt');
const { isValidPassword, isValidEmail } = require('./utils');

/**************************************
 * Register Strategy
 *************************************/

const registerStrategy = new LocalStrategy(
    {
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },

    async (req, email, password, done) => {
        try {
            const existingConsultant = await Consultant.findOne({ email });
            if (existingConsultant) {
                const error = new Error("Email is already registered")
                error.status = 400;
                return done(error);
            }

            if (!isValidEmail(email)) {
                const error = new Error('Invalid email format');
                error.status = 400;
                return done(error);
            }

            if (!isValidPassword(password)) {
                const error = new Error('Invalid password format')
                error.status = 400;
                return done(error);
            }

            const reference = async () => {
                const lastConsultant = await Consultant.findOne({}, {}, { sort: { 'created_at': -1 } }, function (err, post) {
                    console.log(post);
                });
            }

            let date = new Date();

            const day = date.getDate();
            const month = date.getMonth() + 1;
            const year = date.getFullYear();

            if (month < 10) {
                date = `${day}/0${month}/${year}`
            } else {
                date = `${day}/${month}/${year}`
            }

            const saltRounds = 10;
            const passwordHash = await bcrypt.hash(password, saltRounds);

            const newConsultant = new Consultant({
                consultantReference: reference,
                consultantEmail: req.body.email,
                consultantPassword: passwordHash,
                consultantCreationDate: date,
                avatar: req.body.avatar,
                businessUnitLogo: req.body.businessUnitLogo,
                fullName: req.body.fullName,
                consultantMobileNumber: req.body.mobileNumber,
                consultantPhoneNumber: req.body.phoneNumber,
                position: req.body.position,
                occupation: req.body.occupation,
                office1: req.body.office1,
                office2: req.body.office2,
                consultantComments: req.body.comments,
            });

            const savedConsultant = await newConsultant.save();
            savedConsultant.password = null;

            return done(null, savedConsultant);

        } catch (error) {
            return done(error);
        }
    },
);


module.exports = registerStrategy;