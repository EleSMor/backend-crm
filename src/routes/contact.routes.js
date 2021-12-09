const express = require('express');
const { isAdmin } = require('../middlewares/auth.middleware');
const {
    contactGetAll,
    contactGetOne,
    contactFindByFullName,
    contactFindByContactMobileNumber,
    contactFindByEmail,
    contactGetOwners,
    contactCreate,
    contactDelete,
} = require('../controllers/contact.controller');

const router = express.Router();

router.get('/', contactGetAll);
router.get('/owners', contactGetOwners);
router.get('/fullName/:fullName', contactFindByFullName);
router.get('/mobileNumber/:contactMobileNumber', contactFindByContactMobileNumber);
router.get('/email/:email', contactFindByEmail);
router.get('/:id', contactGetOne);

router.post('/create', contactCreate);
router.delete('/delete/:id', contactDelete);

module.exports = router;