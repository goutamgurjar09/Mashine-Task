const express = require("express");
const  rateControllers  = require("../controllers/rateControllers");
const rateLimiter = require("../middleware/rateLimiter");
const router = express.Router();

router.get("/data", rateLimiter, rateControllers.getRateHistory);
module.exports = router;
