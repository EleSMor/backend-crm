const express = require('express');
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');
const {
    contactGetAll,
    contactGetOne,
    contactFindByFullName,
    contactFindByContactMobileNumber,
    contactFindByEmail,
    contactGetOwners,
    contactCreate,
    contactUpdate,
    contactDelete,
} = require('../controllers/contact.controller');

const router = express.Router();

router.get('/', isAuth, contactGetAll);
router.get('/owners', isAuth, contactGetOwners);
router.get('/fullName/:fullName', isAuth, contactFindByFullName);
router.get('/mobileNumber/:contactMobileNumber', isAuth, contactFindByContactMobileNumber);
router.get('/email/:email', isAuth, contactFindByEmail);
router.get('/:id', isAuth, contactGetOne);

router.post('/create', isAuth, contactCreate);
router.put('/edit', isAuth, contactUpdate);
router.delete('/delete/:id', [isAuth, isAdmin], contactDelete);

module.exports = router;