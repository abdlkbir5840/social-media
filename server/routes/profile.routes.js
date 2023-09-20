const express = require("express");
const { body, validationResult, query } = require("express-validator");
const { verify_access_token } = require("../middlewares/verifyToken.middleware");
const { updateProfile,updateSchooling, createSchooling, deleteSchooling } = require("../controllers/profile.controller");
const profileRouter = express.Router();

const updateProfileValidation = [
    query("userId").notEmpty().withMessage('User Id is required'),
    query("profileId").notEmpty().withMessage('Profile Id is required'),
    body("location").notEmpty().withMessage('Location is required'),
    body('city').notEmpty().withMessage('City is required'),
  ]
  const createSchoolingValidation = [
    query("userId").notEmpty().withMessage('User Id is required'),
    query("profileId").notEmpty().withMessage('Profile Id is required'),
    body("school").notEmpty().withMessage('School is required'),
    body('diploma').notEmpty().withMessage('Diploma is required'),
  ]
  const updateSchoolingValidation = [
    query("userId").notEmpty().withMessage('User Id is required'),
    query("profileId").notEmpty().withMessage('Profile Id is required'),
    query("schoolId").notEmpty().withMessage('School Id is required'),
    body("school").notEmpty().withMessage('School is required'),
    body('diploma').notEmpty().withMessage('Diploma is required'),
  ]
  const deleteSchoolingValidation = [
    query("userId").notEmpty().withMessage('User Id is required'),
    query("profileId").notEmpty().withMessage('Profile Id is required'),
    query("schoolId").notEmpty().withMessage('School Id is required'),

  ]
// verify token
profileRouter.use(verify_access_token);
// in query: { userId, profileId } of modifyed profile
//in body  :       {
// {
// "bio":"",
// "location":" ",
// "city": "",
// "relationshipStatus":"",
// }
profileRouter.route('/').put(updateProfileValidation,updateProfile)
// in query: { userId, profileId }
//in body  :       {
// {
// "school":"",
// "diploma":" ",
// }
profileRouter.route('/school').post(createSchoolingValidation, createSchooling)
// in query: { userId, schoolId, profileId }
//in body  :       {
// {
// "school":"",
// "diploma":" ",
// }
profileRouter.route('/school').put(updateSchoolingValidation, updateSchooling)
// in query: { userId, schoolId, profileId }
profileRouter.route('/school').delete(deleteSchoolingValidation, deleteSchooling)

module.exports = {profileRouter}