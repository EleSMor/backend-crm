const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    adsGetAll,
} = require('../controllers/ad.controller');

const router = express.Router();

router.get('/', [isAdmin], adsGetAll);

module.exports = router;