const express = require('express');
const { isAuthenticated } = require('../middlewares/auth');
const { getAllAuction, createAuction } = require('../Controllers/Auction');
const router = express.Router();


router.get('/auctions',isAuthenticated,getAllAuction)
router.post('/auction',isAuthenticated,createAuction)

module.exports = router