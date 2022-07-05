const express = require('express');
const router = express.Router();

const {addGift, getGift, updateGift, deleteGift, updateGiftData, getGiftById } = require('../controllers/gift');

router.post('/addGift', addGift);
router.post('/getGift', getGift);
router.post('/updateGift', updateGift);
router.post('/deleteGift',deleteGift);
router.post('/updateGiftData', updateGiftData);
router.post('/getGiftById', getGiftById);

module.exports = router;
