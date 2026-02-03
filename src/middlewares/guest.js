const jwt = require("jsonwebtoken");

module.exports = function guestOnly(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next();
  }

  const token = authHeader.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    return res.status(403).json({ msg: "Already authenticated" });
  } catch (err) {
    return next();
  }
};
