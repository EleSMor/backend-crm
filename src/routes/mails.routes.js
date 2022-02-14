const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
<<<<<<< HEAD
    eleSendsEmail
=======
    sendAdsToContact
>>>>>>> master
} = require('../controllers/mails.controller');

const router = express.Router();

<<<<<<< HEAD
router.post('/sendEmail', eleSendsEmail);
=======
router.post('/sendEmail', sendAdsToContact);
>>>>>>> master

module.exports = router;