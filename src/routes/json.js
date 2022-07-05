const express = require('express');
const router = express.Router();

const {mob_sequence, sequence} = require('../controllers/json');

router.post('/sequence', sequence);
// router.post('/mob_sequence', mob_sequence);

module.exports = router;
