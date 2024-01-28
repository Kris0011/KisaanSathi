const express = require('express');
const { register, login, logout, loadUser, verifyOTP, subscribeUser, qna } = require('../Controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const multer = require('multer');
const router = express.Router();



router.post('/register', multer({ storage: multer.diskStorage({}) }).single("avtar"),register)
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)
router.post('/verify',verifyOTP)
router.get('/me',loadUser);
router.post('/qna',isAuthenticated,qna)
router.post('/subscribeUser', subscribeUser);


module.exports = router