const express = require('express');
const { register, login, logout, loadUser, verifyOTP } = require('../Controllers/User');
const { isAuthenticated } = require('../middlewares/auth');
const router = express.Router();


router.post('/register',register)
router.post('/login',login)
router.get('/logout',isAuthenticated,logout)
router.post('/verify',verifyOTP)
router.get('/me',loadUser);


module.exports = router