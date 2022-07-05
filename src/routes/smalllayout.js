const express = require('express');
const router = express.Router();

const {addSmalllayout, getSmalllayout, updateSmalllayout, deleteSmalllayout, updateSmallLayoutData, getSmallLayoutById } = require('../controllers/smalllayout');

router.post('/addSmalllayout', addSmalllayout);
router.post('/getSmalllayout', getSmalllayout);
router.post('/updateSmalllayout', updateSmalllayout);
router.post('/deleteSmalllayout',deleteSmalllayout);
router.post('/updateSmallLayoutData',updateSmallLayoutData);
router.post('/getSmallLayoutById',getSmallLayoutById);

module.exports = router;
