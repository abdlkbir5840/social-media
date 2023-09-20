const prisma = require("../prisma/prisma");

const findProfileById = async (profileId, userId) => {
  const profile = await prisma.userProfile.findFirst({
    where: {
      id: parseInt(profileId),
      userId: parseInt(userId),
    },
  });
  return profile;
};

const updateProfile = async (profileId, profileDetails) => {
  const profile = await prisma.userProfile.update({
    where: {
      id: parseInt(profileId),
    },
    data: {
      bio: profileDetails.bio,
      location: profileDetails.location,
      city: profileDetails.city,
      relationshipStatus: profileDetails.relationshipStatus,
    },
    include: {
      schooling: true,
    },
  });
  return profile;
};

const findSchoolById = async (schoolId, profileId) => {
  const school = await prisma.schooling.findFirst({
    where: {
      id: parseInt(schoolId),
      userProfileId: parseInt(profileId),
    },
  });
  return school;
};

const createSchool = async (profileId, schoolDetails) => {
  const school = await prisma.schooling.create({
    data: {
      school: schoolDetails.school,
      diploma: schoolDetails.diploma,
      userProfile: {
        connect: {
          id: parseInt(profileId),
        },
      },
    },
  });
  return school;
};

const updateSchool = async (schoolId, schoolDetails) => {
  const school = await prisma.schooling.update({
    where: {
      id: parseInt(schoolId),
    },
    data: {
      school: schoolDetails.school,
      diploma: schoolDetails.diploma,
    },
  });
  return school;
};

const deleteSchool = async (schoolId, userProfileId) => {
  const school = await prisma.schooling.delete({
    where: {
      id: parseInt(schoolId),
      userProfileId: parseInt(userProfileId)
    },
  });
  return school;
};

module.exports = {
  findProfileById,
  updateProfile,
  findSchoolById,
  createSchool,
  updateSchool,
  deleteSchool
};
