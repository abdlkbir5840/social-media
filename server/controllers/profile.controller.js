const { validationResult } = require("express-validator");
const {
  updateUserProfile,
  updateUserProfileSchool,
  createUserProfileSchool,
  deleteUserProfileSchool
} = require("../services/profile.service");
const CustomError = require("../exceptions/CustomError");

/* Profile Management */

const updateProfile = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = new CustomError("Validation failed", 400);
      validationError.details = errors.array();
      return next(validationError);
    }
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = new CustomError("Validation failed", 400);
      validationError.details = errors.array();
      return next(validationError);
    }
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
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = new CustomError("Validation failed", 400);
      validationError.details = errors.array();
      return next(validationError);
    }
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

const deleteSchooling = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const validationError = new CustomError("Validation failed", 400);
      validationError.details = errors.array();
      return next(validationError);
    }
    const userId = req.query.userId;
    const profileId = req.query.profileId;
    const schoolId = req.query.schoolId;
    const school = await deleteUserProfileSchool(
      userId,
      profileId,
      schoolId
    );

    res.json({message: `school with ID ${school.id} deleted with success`});
  } catch (err) {
    next(err);
  }
}
module.exports = { updateProfile, updateSchooling, createSchooling, deleteSchooling };
