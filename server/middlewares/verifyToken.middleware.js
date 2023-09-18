const jwt = require("jsonwebtoken");
const CustomError = require("../exceptions/CustomError");

// Verify access token
const verify_access_token = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader) {
    const error = new CustomError("Authorization header note found", 401);
    next(error);
  } else if (!authHeader?.startsWith("Bearer ")) {
    const error = new CustomError("Unauthorized", 401);
    next(error);
  } else {
    const token = authHeader.split(" ")[1]; // ['Bearer', 'token']
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        if (error instanceof jwt.TokenExpiredError)
          next(new CustomError("Expired token", 401));
        if (error instanceof jwt.JsonWebTokenError)
          next(new CustomError("Invalid token", 401));
      } else {
        req.currentUser = decoded.userInfo.id;
        next();
      }
    });
  }
};

module.exports = {verify_access_token}