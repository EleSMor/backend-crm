const LocalStrategy = require('passport-local').Strategy;
const Consultant = require('../models/Consultant.model');
const bcrypt = require('bcrypt');

/**************************************
 * Login Strategy
 *************************************/

const loginStrategy = new LocalStrategy(
    {
        emailField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, alias, password, done) => {
        try {

            let existingConsultant = await Consultant.findOne({ alias });

            if (!existingConsultant) {
                const error = new Error("Email doesn't exist");
                error.status = 401;
                return done(error, null);
            }

            const isValidPassword = await bcrypt.compare(password, existingConsultant.password);

            if (!isValidPassword) {
                const error = new Error("Incorrect password. Try again");
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