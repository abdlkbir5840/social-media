const {
  updateUserProfile,
  updateUserProfileSchool,
  createUserProfileSchool,
} = require("../services/profile.service");

/* Profile Management */

const updateProfile = async (req, res, next) => {
  try {
    const profileDetails = req.body;
    const userId = req.query.userId;
    const profileId = req.query.profileId;
    const profile = await updateUserProfile(userId, profileId, profileDetails);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

const updateSchooling = async (req, res, next) => {
  try {
    const schoolDetails = req.body;
    const schoolId = req.query.schoolId;
    const profileId = req.query.profileId;
    const userId = req.query.userId;
    const school = await updateUserProfileSchool(
      userId,
      schoolId,
      profileId,
      schoolDetails
    );
    res.json(school);
  } catch (err) {
    next(err);
  }
};

const createSchooling = async (req, res, next) => {
  try {
    const schoolDetails = req.body;
    const profileId = req.query.profileId;
    const userId = req.query.userId;
    const school = await createUserProfileSchool(
      userId,
      profileId,
      schoolDetails
    );
    res.json(school);
  } catch (err) {
    next(err);
  }
};

module.exports = { updateProfile, updateSchooling, createSchooling };
