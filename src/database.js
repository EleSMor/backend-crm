const mongoose = require('mongoose');
require('./database')

const DB_URL = 'mongodb://localhost:27017/gvre-crm';

const connect = async () => {
    try {
        await mongoose.connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log(`Database is conected ${db.connection.host}`);
    } catch (err) {
        console.error(err)
    };
};

module.exports = {
    DB_URL,
    connect,
};

