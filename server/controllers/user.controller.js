  /* User Search */
  
  const searchUser = async (req, res, next) => {
    res.json({ name: req.query.name });
  };
  
  module.exports = {
    searchUser,
  };