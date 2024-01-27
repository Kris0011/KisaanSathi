const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { getAllAuction, createAuction , checkMail, checkAuction } = require('../Controllers/Auction');
const router = express.Router();
const multer = require("multer");


router.get('/auctions',isAuthenticated, getAllAuction)
router.post('/createauction',isAuthenticated, multer({ storage: multer.diskStorage({}) }).single("cropImage"), createAuction)
router.post('/checkauction',isAuthenticated, checkAuction)
router.post('/sendmail' , checkMail)

module.exports = router