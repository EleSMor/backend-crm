const express = require('express');
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');
const { upload } = require('../middlewares/file.middleware');
const { consultantGetAll, consultantGetOne, consultantDelete, consultantUpdate } = require('../controllers/consultant.controller');
const { registerPost } = require('../controllers/auth.controller');

const router = express.Router();

router.get('/', isAuth, consultantGetAll);
router.get('/:id', isAuth, consultantGetOne);

router.post('/create', [isAuth, upload.fields([{ name: 'avatar' }, { name: 'companyUnitLogo' }])], registerPost);
router.put('/edit', [isAuth, upload.fields([{ name: 'avatar' }, { name: 'companyUnitLogo' }])], consultantUpdate);

router.delete('/delete/:id', [isAuth, isAdmin], consultantDelete);

module.exports = router;