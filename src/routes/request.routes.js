const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    requestsGetAll,
} = require('../controllers/request.controller');

const router = express.Router();

router.get('/', [isAdmin], requestsGetAll);

module.exports = router;