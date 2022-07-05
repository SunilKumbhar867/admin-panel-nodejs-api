const express = require('express');
const router = express.Router();

const {addQuestion, getQuestion, updateQuestion, deleteQuestion, verifyQuestion, updateStatus, getQuizById } = require('../controllers/quiz');

router.post('/addQuestion', addQuestion);
router.post('/getQuestion', getQuestion);
router.post('/updateStatus', updateStatus);
router.post('/deleteQuestion',deleteQuestion);
router.post('/verifyQuestion',verifyQuestion);
router.post('/updateQuestion', updateQuestion);
router.post('/getQuizById', getQuizById);

module.exports = router;
