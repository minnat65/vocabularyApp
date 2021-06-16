const express = require('express');
const wordControllers = require('../controllers/wordControllers');

const router = express.Router();

router
    .route(`/:wordId`)
    .get(wordControllers.getWordFromOxford);

module.exports = router;