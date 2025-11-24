const moment = require("moment");
const RateLimit = require("../models/RateLimit");
const { Op } = require("sequelize");

const rateLimiter = async (req, res, next) => {
  try {
    const userId = req.headers.userid;
    const ip = req.headers["x-forwarded-for"] || req.ip;

    if (!userId) {
      return res.status(400).json({ msg: "userId header is required" });
    }
    const oneMinuteAgo = moment().subtract(1, "minute").toDate();
    const userCount = await RateLimit.count({
      where: {
        userId,
        createdAt: { [Op.gte]: oneMinuteAgo },
      },
    });

    if (userCount >= 5) {
      return res.status(429).json({ msg: "USER rate limit exceeded (max 5 per minute)" });
    }
    const ipCount = await RateLimit.count({
      where: {
        ipAddress: ip,
        createdAt: { [Op.gte]: oneMinuteAgo },
      },
    });

    if (ipCount >= 20) {
      return res.status(429).json({ msg: "IP rate limit exceeded (max 20 per minute)" });
    }
    await RateLimit.create({ userId, ipAddress: ip });
    next();
  } catch (error) {
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

module.exports = rateLimiter;
