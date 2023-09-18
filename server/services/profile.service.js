const CustomError = require("../exceptions/CustomError");
const { updateProfile, findProfileById, findSchoolById, updateSchool, createSchool } = require("../repositories/profile.repository")

const updateUserProfile = async (userId, profileId,profileDetails) => {
    const existingProfile = await findProfileById(profileId, userId)
    if(!existingProfile){
        throw new CustomError('Profile not found', 404);
    }
    const profile = await updateProfile(profileId,profileDetails);
    return profile;
}

const updateUserProfileSchool = async (userId, schoolId, profileId, schoolDetails) => {
    const existingProfile = await findProfileById(profileId, userId)
    if(!existingProfile){
        throw new CustomError('Profile not found', 404);
    }
    const existingSchool = await findSchoolById(schoolId, profileId)
    if(!existingSchool){
        throw new CustomError('School not found', 404);
    }
    const school = await updateSchool(schoolId,schoolDetails);
    return school;
}

const createUserProfileSchool = async (userId,profileId, schoolDetails) => {
    const existingProfile = await findProfileById(profileId, userId)
    if(!existingProfile){
        throw new CustomError('Profile not found', 404);
    }
    const school = await createSchool(profileId,schoolDetails);
    return school;
}
module.exports = {updateUserProfile, updateUserProfileSchool, createUserProfileSchool}