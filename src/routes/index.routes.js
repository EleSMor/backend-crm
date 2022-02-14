const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
    res.json({msg: 'hello world'});
});

module.exports = router
