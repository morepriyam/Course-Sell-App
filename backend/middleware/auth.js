// Middleware to authenticate using JWT
const jwt = require("jsonwebtoken");
const secret_key = "NOTESAPI";

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, secret_key, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user; // Attach the user object to the request
      next(); // Move to the next middleware/controller
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
};

module.exports = { authenticateJwt, secret_key };
