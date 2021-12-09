const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    requestsGetAll,
    requestGetOne,
    requestLastReference,
    requestGetAdsMatched,
    requestGetNewMatched,
    requestGetByContact,
    requestCreate,
    requestDelete
} = require('../controllers/request.controller');

const router = express.Router();

router.get('/', requestsGetAll);
router.get('/lastReference', requestLastReference);
router.get('/matching/new', requestGetNewMatched);
router.get('/matching/:id', requestGetAdsMatched);
router.get('/contact/:id', requestGetByContact);
router.get('/:id', requestGetOne);

router.post('/create', requestCreate);

router.delete('/delete/:id', requestDelete);

module.exports = router;