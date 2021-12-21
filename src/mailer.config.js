const nodemailer = require("nodemailer");
require("dotenv").config();

// Functions that depends on who is requesting the shipment

const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "",
        pass: "",
    }
});

transporter.verify((error, success) => {
    if (error) {
        console.log(error)
    } else {
        console.log("Nodemailer is ready!");
    }
});