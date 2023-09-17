const prisma = require("../prisma/prisma");

const findMany = async () => {
  const useres = prisma.user.findMany();
  return useres;
};

const findById = async (id) => {
  const user = prisma.user.findFirst({
    where: {
      id: id,
    },
  });
  return user;
};

const findByEmail = async (email) => {
  const user = prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  return user;
};

const createUserWithProfile = async ({ username, email, hashedPassword, location, occupation, bio="" } ) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      location: location,
      occupation: occupation,
      impressions:0,
      viewedProfile:0,
      profile: {
        create: {
          bio:bio,
        },
      },
    },
    include: {
      profile: true,
      profileImg: true,
    },
  });
 
  return newUser;
};

const createUserWithProfileAndImage = async ({ username, email, hashedPassword, location, occupation, bio, imagePath="" } ) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      location: location,
      occupation: occupation,
      impressions:0,
      viewedProfile:0,
      profile: {
        create: {
          bio:bio,
        },
      },
      profileImg: {
        create: {
          url: imagePath,
        },
      },
    },
    include: {
      profile: true,
      profileImg: true,
    },
  });
  return newUser;
};
module.exports = {findMany, findById, findByEmail, createUserWithProfile, createUserWithProfileAndImage};
