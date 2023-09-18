
/* Friends Management */

const follow = async (req, res, next) => {
    res.json({
      followerId: req.query.followerId,
      followingId: req.query.followingId,
    });
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
  