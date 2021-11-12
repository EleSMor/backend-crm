const express = require('express');
const { upload } = require('../libs/multer')
const router = express.Router();

router.post('/upload', upload.single('file'), async (req, res) => {
    console.log(req.files)

    return res.json('received')
});


module.exports = router;