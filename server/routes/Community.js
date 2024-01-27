const express = require('express');
const router = express.Router();

const { createPost , getPost } = require("../Controllers/postController");
const { createComment } = require("../Controllers/commentController");


router.post('/createPost', createPost);

router.get('/getPost', getPost);

router.post('/createComment', createComment);


module.exports = router;