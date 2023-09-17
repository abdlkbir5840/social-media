const { validationResult } = require("express-validator");
const {
  registerUser,
  loginUser,
  refreshUuser,
} = require("../services/auth.service");
const path = require("path");
const CustomError = require("../exceptions/CustomError");

const register = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const validationError = new CustomError("Validation failed", 400);
    validationError.details = errors.array();
    return next(validationError);
  }
  try {
    const user = await req.body;
    const pictuer = req.files;
    const newUser = await registerUser(user, pictuer);
    return res.json(newUser);
  } catch (err) {
    //Handle service error
    next(err);
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const validationError = new CustomError("Validation failed", 400);
    validationError.details = errors.array();
    return next(validationError);
  }
  const user = await req.body;
  try {
    const { accessToken, refreshToken, username, email } = await loginUser(
      user
    );
    //store refresh token in cookie
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxeAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.json({
      accessToken: accessToken,
      username: username,
      email: email,
    });
  } catch (err) {
    //Handle service error
    next(err);
  }
};

const refresh = async (req, res, next) => {
  try {
    const cookie = await req.cookies;
    const access_token = await refreshUuser(cookie);
    res.json({access_token: access_token});
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try{
    const cookie = req.cookies;
    if(!cookie?.jwt){
      const error = new CustomError('Unauthorized',401)
      return next(error)
    }
    await res.clearCookie('jwt',{
      httpOnly: true,
      secure: true,
      sameSite: 'None',
    })
    return res.json({message: 'Logout seccessfully'})
  }catch(err){
    next(err);
  }
}
module.exports = { register, login, refresh, logout };
