const RateLimit  = require("../models/RateLimit");
const { Op } = require("sequelize");

exports.getRateHistory = async (req, res) => {
  try {
    const rateLimits = await RateLimit.findAll();
    res.status(200).json(rateLimits);
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};