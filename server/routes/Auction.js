const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { getAllAuction, createAuction , checkMail } = require('../Controllers/Auction');
const router = express.Router();


router.get('/auctions',isAuthenticated,getAllAuction)
router.post('/auction',isAuthenticated,createAuction)
router.post('/sendmail' , checkMail)

module.exports = router