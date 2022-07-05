const express = require('express');
const router = express.Router();

const {addAdminUser, adminLogin, adminUser, addImage } = require('../controllers/user');

router.post('/addAdminUser', addAdminUser);
router.post('/adminLogin', adminLogin);
router.post('/adminUser', adminUser);
router.post('/addImage',addImage);

module.exports = router;
