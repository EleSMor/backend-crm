const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    requestsGetAll,
    requestGetOne,
    requestLastReference,
    requestGetAdsMatched,
    requestGetByContact,
    requestCreate,
    requestDelete
} = require('../controllers/request.controller');

const router = express.Router();

router.get('/', requestsGetAll);
router.get('/lastReference', requestLastReference);
router.get('/:id', requestGetOne);
router.get('/matching/:id', requestGetAdsMatched)
router.get('/contact/:id', requestGetByContact);

router.post('/create', requestCreate);

router.delete('/delete/:id', requestDelete);

module.exports = router;