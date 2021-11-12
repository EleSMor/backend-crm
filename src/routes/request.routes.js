const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    requestsGetAll,
    requestGetOne,
    requestGetByConsultant,
    requestCreate,
    requestDelete
} = require('../controllers/request.controller');

const router = express.Router();

router.get('/', requestsGetAll);
router.get('/:id', requestGetOne);
router.get('/consultant/:id', requestGetByConsultant);

router.post('/create', requestCreate);

router.delete('/delete/:id', requestDelete);

module.exports = router;