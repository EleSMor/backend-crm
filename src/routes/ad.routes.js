const express = require('express');
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
router.get('/:id', adGetOne);
router.get('/matching/:id', adGetMatchedRequests);
router.post('/create', adCreate);
router.delete('/delete/:id', adDelete);

module.exports = router;