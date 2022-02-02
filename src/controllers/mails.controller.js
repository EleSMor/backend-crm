const nodemailer = require('nodemailer'); // email sender function 

const eleSendsEmail = (req, res) => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'equipo@attomo.digital',
            pass: '@@Google-Attomo'
        }
    });
    transporter.verify(function (error, success) {
        if (error) {
            console.log(error);
        } else {
            console.log("Server is ready to take our messages");
        }
    });

    const mailOptions = {
        from: 'Eleazar',
        to: 'ele.caudete@gmail.com',
        subject: 'Prueba de nodemailer',
        text: 'Mensaje de prueba de nodemailer'
    };
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200).json(req.body);
        }
    });
}

module.exports = { eleSendsEmail }