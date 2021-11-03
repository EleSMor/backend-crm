const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    adGetAll,
} = require('../controllers/ad.controller');

const router = express.Router();

router.get('/', [isAdmin], adGetAll);

module.exports = router;