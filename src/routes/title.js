const express = require('express');
const router = express.Router();

const {addTitle, getTitle, updateTitle, deleteTitle, getTitleById,updateTitleData } = require('../controllers/title');

router.post('/addTitle', addTitle);
router.post('/getTitle', getTitle);
router.post('/updateTitle', updateTitle);
router.post('/deleteTitle',deleteTitle);
router.post('/getTitleById',getTitleById);
router.post('/updateTitleData',updateTitleData);

module.exports = router;
