const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    eleSendsEmail
} = require('../controllers/mails.controller');

const router = express.Router();

router.post('/sendEmail', eleSendsEmail);

module.exports = router;