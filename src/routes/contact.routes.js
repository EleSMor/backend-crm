const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    contactGetAll,
    contactCreate,
} = require('../controllers/contact.controller');

const router = express.Router();

router.get('/', contactGetAll);

router.post('/create', contactCreate);

module.exports = router;