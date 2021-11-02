const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
require('./auth');
const db = require('./db');
const cors = require('cors');
const app = express();

// Routes
const indexRoutes = require('./routes/index.routes');
const authRoutes = require('./routes/auth.routes');
const contactRoutes = require('./routes/contact.routes');

db.connect();

// Settings
const PORT = process.env.PORT || 3500;
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    return next();
});

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    optionsSuccessStatus: 200,
}));

app.use(session({
    secret: process.env.SESSION_SECRET || 'asd!WQe!"3d.asd0/)12/3Adcq',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1 * 24 * 3600 * 1000,
    },
    store: MongoStore.create({ mongoUrl: db.DB_URL }),
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// // User authentication validator
// app.use((req, res, next) => {
//     req.isAdmin = false;

//     if(!req.isAuthenticated()) {
//         return next();
//     } else {
//         req.isUser = true;
//     }

//     if (req.user && req.user.role === 'admin') {
//         req.isAdmin = true;
//     }

//     return next();
// });

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/contacts', contactRoutes);

app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`)
})

module.exports = app;