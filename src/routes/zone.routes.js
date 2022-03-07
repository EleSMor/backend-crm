const express = require('express');
const { isAuth } = require('../middlewares/auth.middleware');
const {
    zonesGetResidentials,
    zonesGetPatrimonials,
    zoneCreate,
    zoneDelete
} = require('../controllers/zone.controller');

const router = express.Router();

router.get('/residentials', isAuth, zonesGetResidentials);
router.get('/patrimonials', isAuth, zonesGetPatrimonials);

router.post('/create', isAuth, zoneCreate);

router.delete('/delete/:id', isAuth, zoneDelete);

module.exports = router;