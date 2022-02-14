const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    sendAdsToContact
} = require('../controllers/mails.controller');

const router = express.Router();

router.post('/sendEmail', sendAdsToContact);

module.exports = router;