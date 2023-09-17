const jwt = require("jsonwebtoken");
const CustomError = require("../exceptions/CustomError");

// Verify access token
const verify_access_token = async (req, res, next) => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (!authHeader) {
    const error = new CustomError("Authorization header note found", 401);
    next(error);
  } else if (!authHeader?.statsWith("Bearer ")) {
    const error = new CustomError("Unauthorized", 401);
    next(error);
  }else{
    const token = authHeader.split(' ')[1];// ['Bearer', 'token']
  }
};
