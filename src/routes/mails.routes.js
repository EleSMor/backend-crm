const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    sendAdsToContact,
    sendAdToContacts
} = require('../controllers/mails.controller');

const router = express.Router();

router.post('/sendAdsToContact', sendAdsToContact);
router.post('/sendAdToContacts', sendAdToContacts);

module.exports = router;