const express = require("express");
const { body, validationResult, query } = require("express-validator");
const { verify_access_token } = require("../middlewares/verifyToken.middleware");
const { follow, unfollow, searchFriend } = require("../controllers/friend.controller");
const friendRouter = express.Router();

const friendDataValidation = [
    query("followerId").notEmpty().withMessage('Follower id is required'),
    query("followedId").notEmpty().withMessage('Followed id is required'),
  ]
// verify token
friendRouter.use(verify_access_token);
//get all
friendRouter.route('/').get()
// in qeury { followerId, followedId }
friendRouter.route('/follow').post(friendDataValidation, follow)
// in qeury { followerId, followingId }
friendRouter.route('/unfollow').delete(unfollow)
// in qeury { name }
friendRouter.route('/searchFrienf').get(searchFriend)

module.exports = {friendRouter}