const express = require('express');
const router = express.Router();

const { createPost, getPost } = require("../Controllers/Post");


router.post('/createPost', createPost);
router.get('/getPost', getPost);

module.exports = router;