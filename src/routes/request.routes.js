const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    requestsGetAll,
    requestGetOne,
    requestLastReference,
    requestGetByConsultant,
    requestCreate,
    requestDelete
} = require('../controllers/request.controller');

const router = express.Router();

router.get('/', requestsGetAll);
router.get('/lastReference', requestLastReference);
router.get('/consultant/:id', requestGetByConsultant);
router.get('/:id', requestGetOne);

router.post('/create', requestCreate);

router.delete('/delete/:id', requestDelete);

module.exports = router;