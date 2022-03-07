const express = require('express');
const { isAuth } = require('../middlewares/auth.middleware');
const {
    sendAdsToContact,
    sendAdToContacts
} = require('../controllers/mails.controller');

const router = express.Router();

router.post('/sendAdsToContact', isAuth, sendAdsToContact);
router.post('/sendAdToContacts', isAuth, sendAdToContacts);

module.exports = router;