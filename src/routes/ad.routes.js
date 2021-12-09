const express = require('express');
const { upload } = require('../middlewares/file.middleware');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    adGetAll,
    adGetOne,
    adGetMatchedRequests,
    adCreate,
    adDelete,
} = require('../controllers/ad.controller');

const router = express.Router();

router.get('/', adGetAll);
router.get('/matching/:id', adGetMatchedRequests);
router.get('/:id', adGetOne);

router.post('/create', adCreate);
router.delete('/delete/:id', adDelete);

module.exports = router;