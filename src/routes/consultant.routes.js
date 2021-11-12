const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const { upload } = require('../libs/multer');
// const { upload } = require('../libs/multer');
const { consultantGetAll, consultantGetOne, consultantCreate, consultantDelete } = require('../controllers/consultant.controller');

const router = express.Router();

router.get('/', consultantGetAll);
router.get('/:id', consultantGetOne);

router.post('/create', upload.single('avatar'), consultantCreate);

router.delete('/delete/:id', consultantDelete);


module.exports = router;