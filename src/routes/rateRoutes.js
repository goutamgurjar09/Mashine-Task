const express = require("express");
const  rateControllers  = require("../controllers/rateControllers");
const rateLimiter = require("../middleware/rateLimiter");
const router = express.Router();

router.get("/rate-history", rateLimiter, rateControllers.getRateHistory);
module.exports = router;
