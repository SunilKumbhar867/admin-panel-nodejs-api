const express = require('express');
const router = express.Router();

const {addBlog, getBlog, updateBlog, deleteBlog, updateBlogData, getBlogById } = require('../controllers/blog');

router.post('/addBlog', addBlog);
router.post('/getBlog', getBlog);
router.post('/updateBlog', updateBlog);
router.post('/deleteBlog',deleteBlog);
router.post('/updateBlogData', updateBlogData);
router.post('/getBlogById', getBlogById);

module.exports = router;
