const mongoose = require('mongoose');

const DB_URL = 'mongodb+srv://db_user_admin:oud73k5MxqnJhF0v@cluster0.c4emj.mongodb.net/gvre-crm?retryWrites=true&w=majority';

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

