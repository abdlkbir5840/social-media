const express = require("express");
const { body, validationResult } = require("express-validator");
const { verify_access_token } = require("../middlewares/verifyToken.middleware");
const { follow, unfollow, searchFriend } = require("../controllers/friend.controller");
const friendRouter = express.Router();

const createProfileValidation = [
    body("username").notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('city').notEmpty().withMessage('City is required')
  ]
// verify token
friendRouter.use(verify_access_token);
//get all
friendRouter.route('/').get()
// in qeury { followerId, followingId }
friendRouter.route('/follow').post(follow)
// in qeury { followerId, followingId }
friendRouter.route('/unfollow').delete(unfollow)
// in qeury { name }
friendRouter.route('/searchFrienf').get(searchFriend)

module.exports = {friendRouter}