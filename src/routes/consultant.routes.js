const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const { contactsGetAll } = require('../controllers/contact.controller');

const router = express.Router();

router.get('/', [isAdmin], contactsGetAll);

module.exports = router;