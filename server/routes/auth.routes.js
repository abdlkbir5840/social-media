const express = require("express");
const authRouter = express.Router();
const { body, validationResult } = require("express-validator");
const { register , login, refresh, logout} = require("../controllers/auth.controller");

const registrationValidation = [
  body("username").notEmpty().withMessage('Username is required'),
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
  body('location').notEmpty().withMessage('Location is required')
]

const loginValidation = [
  body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
  body('password').notEmpty().withMessage('Password is required'),
]
authRouter.route('/auth/register').post(registrationValidation, register);
authRouter.route('/auth/login').post(loginValidation, login);
authRouter.route('/auth/refresh').get(loginValidation, refresh);
authRouter.route('/auth/logout').post(loginValidation, logout);

module.exports = authRouter;