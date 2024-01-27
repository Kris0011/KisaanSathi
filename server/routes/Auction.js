const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { getAllAuction, createAuction , checkMail } = require('../Controllers/Auction');
const router = express.Router();
const multer = require("multer");


router.get('/auctions',isAuthenticated, getAllAuction)
router.post('/auction',isAuthenticated, multer({ storage: multer.diskStorage({}) }).single("cropImage"), createAuction)
router.post('/sendmail' , checkMail)

module.exports = router