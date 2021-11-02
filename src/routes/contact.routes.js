const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    contactsGetAll,
    contactsCreate,
} = require('../controllers/contact.controller');

const router = express.Router();

router.get('/', contactsGetAll);
router.post('/create', contactsCreate);

module.exports = router;