const { validationResult } = require("express-validator");
const { followUser } = require("../services/friend.service");
const CustomError = require("../exceptions/CustomError");

/* Friends Management */

const follow = async (req, res, next) => {
  try{
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = new CustomError("Validation failed", 400);
      validationError.details = errors.array();
      return next(validationError);
    }
    const followerId = parseInt(req.query.followerId);
    const followedId = parseInt(req.query.followedId);
    const friend = await followUser( followerId, followedId );
      res.json(friend);
  }catch(err){
    next(err)
  }
};

const unfollow = async (req, res, next) => {
  res.json({
    followerId: req.query.followerId,
    followingId: req.query.followingId,
  });
};

const searchFriend = async (req, res, next) => {
  res.json({ name: req.query.name });
};

module.exports = {
  follow,
  unfollow,
  searchFriend,
};
