const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const { upload } = require('../libs/multer');
const { consultantGetAll, consultantGetOne, consultantCreate, consultantDelete } = require('../controllers/consultant.controller');
const { registerPost } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/', consultantGetAll);
router.get('/:id', consultantGetOne);

router.post('/create', upload.fields([{ name: 'avatar' }, { name: 'companyUnitLogo' }]), registerPost);

router.delete('/delete/:id', consultantDelete);


module.exports = router;