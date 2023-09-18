const express = require("express");
const { body, validationResult } = require("express-validator");
const { verify_access_token } = require("../middlewares/verifyToken.middleware");
const { updateProfile,updateSchooling, createSchooling } = require("../controllers/profile.controller");
const profileRouter = express.Router();

const createProfileValidation = [
    body("username").notEmpty().withMessage('Username is required'),
    body('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
    body('password').notEmpty().withMessage('Password is required'),
    body('location').notEmpty().withMessage('Location is required'),
    body('city').notEmpty().withMessage('City is required')
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
profileRouter.route('/').put(updateProfile)
// in query: { userId, profileId }
//in body  :       {
// {
// "school":"",
// "diploma":" ",
// }
profileRouter.route('/school').post(createSchooling)
// in query: { userId, schoolId, profileId }
//in body  :       {
// {
// "school":"",
// "diploma":" ",
// }
profileRouter.route('/school').put(updateSchooling)

module.exports = {profileRouter}