const express = require("express");
const authRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { register , login, refresh, logout} = require("../controllers/auth.controller");

const registrationValidation = [
  body("username").notEmpty().withMessage('Username is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  body('location').notEmpty().withMessage('Location is required'),
  body('city').notEmpty().withMessage('City is required')
]

const loginValidation = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
]
authRouter.route('/register').post(registrationValidation, register);
authRouter.route('/login').post(loginValidation, login);
authRouter.route('/refresh').get(refresh);
authRouter.route('/logout').post(logout);

module.exports = authRouter;