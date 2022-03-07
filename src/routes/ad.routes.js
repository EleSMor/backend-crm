const express = require('express');
const { upload, deleteImage } = require('../middlewares/file.middleware');
const { isAuth, isAdmin } = require('../middlewares/auth.middleware');
const {
    adGetAll,
    adGetOne,
    adGetMatchedRequests,
    adCreate,
    adUpdate,
    adMainImageUpload,
    adMainImagesDelete,
    adBlueprintImageUpload,
    adBlueprintImagesDelete,
    adOthersImagesUpload,
    adOthersImagesDelete,
    adDelete,
} = require('../controllers/ad.controller');

const router = express.Router();

router.get('/', isAuth, adGetAll);
router.get('/matching/:id', isAuth, adGetMatchedRequests);
router.get('/:id', adGetOne);

router.post('/create', isAuth, adCreate);
router.put('/edit', isAuth, adUpdate);
router.put('/upload/main/:id', [isAuth, upload.single('main')], adMainImageUpload);
router.put('/delete/main/:id', isAuth, adMainImagesDelete);
router.put('/upload/blueprint/:id', [isAuth, upload.array('blueprint')], adBlueprintImageUpload);
router.put('/delete/blueprint/:id', isAuth, adBlueprintImagesDelete);
router.put('/upload/others/:id', [isAuth, upload.array('others')], adOthersImagesUpload);
router.put('/delete/others/:id', isAuth, adOthersImagesDelete);
router.delete('/delete/:id', isAuth, adDelete);

module.exports = router;