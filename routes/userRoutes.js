const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send('<h2>My Name is Mohamed Gomri</h2>');
});

module.exports = router;