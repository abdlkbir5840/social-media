const express = require("express");
const { body, validationResult } = require("express-validator");
const { verify_access_token } = require("../middlewares/verifyToken.middleware");
const { searchUser } = require("../controllers/user.controller");
const userRouter = express.Router();

const createProfileValidation = [
    body("username").notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('city').notEmpty().withMessage('City is required')
  ]
// verify token
userRouter.use(verify_access_token);

// in qeury { name, filters{person, post, photos, pages, groups,} }
userRouter.route('/searchFrienf').get(searchUser)

module.exports = {userRouter}