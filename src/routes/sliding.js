const express = require('express');
const router = express.Router();

const {addSliding, getSliding, updateSliding, deleteSliding, updateSlidingData, getSlidingById } = require('../controllers/sliding');

router.post('/addSliding', addSliding);
router.post('/getSliding', getSliding);
router.post('/updateSliding', updateSliding);
router.post('/deleteSliding',deleteSliding);
router.post('/updateSlidingData',updateSlidingData);
router.post('/getSlidingById',getSlidingById);

module.exports = router;
