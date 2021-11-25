const LocalStrategy = require('passport-local').Strategy;
const Consultant = require('../models/consultant.model');
const bcrypt = require('bcrypt');

/**************************************
 * Login Strategy
 *************************************/

const loginStrategy = new LocalStrategy(
    {
        usernameField: 'identity',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, identity, password, done) => {
        try {

            console.log(identity);
            console.log(password);
            // User can login with consultantEmail or consultantMobileNumber
            let existingConsultant = await Consultant.findOne({ $or: [{ consultantEmail: identity }, { consultantMobileNumber: identity }] });

            if (!existingConsultant) {
                const error = new Error("Este usuario no existe");
                error.status = 401;
                return done(error, null);
            }

            console.log(existingConsultant.consultantPassword);
            const isValidPassword = await bcrypt.compare(password, existingConsultant.consultantPassword);

            if (!isValidPassword) {
                const error = new Error("Contraseña incorrecta. Prueba de nuevo");
                return done(error, null);
            }

            existingConsultant.password = null;
            return done(null, existingConsultant);

        } catch (error) {
            return done(error, null);
        }
    },
);

module.exports = loginStrategy;