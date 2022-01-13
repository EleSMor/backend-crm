const mongoose = require('mongoose');

const DB_URL = process.env.MONGODB_URI || 'mongodb+srv://gvreadmin:P9vxkd801T4f35F2@db-mongodb-prod-crm-e062a978.mongo.ondigitalocean.com/gvre?authSource=admin&replicaSet=db-mongodb-prod-crm&tls=true&tlsCAFile=/Users/Ele/certificates/ca-certificate.crt';

const connect = async () => {
    try {
        const db = await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        const { name, host } = db.connection;
        console.log(`Connected to the database ${name} in host ${host}`);
    } catch (err) {
        console.log('Ha ocurrido un error conectando a la base de datos.', err);
    };
};

module.exports = {
    DB_URL,
    connect,
};

