const express = require('express');
const wordControllers = require('../controllers/wordControllers');

const router = express.Router();

router
    .route('/')
    .get(wordControllers.getAllWords);

router.route('/:wordId').get(wordControllers.getWordById);


module.exports = router;