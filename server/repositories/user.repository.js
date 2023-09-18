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

const createUserWithProfile = async ({ username, email, hashedPassword, location, city, occupation } ) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      occupation: occupation,
      profile: {
        create: {
          location: location,
          city: city,
        },
      },
    },
    include: {
      profile:true,
      profileImg: true,
    },
  });
 
  return newUser;
};

const createUserWithProfileAndImage = async ({ username, email, hashedPassword, location, city, occupation, imagePath="" } ) => {
  const newUser = await prisma.user.create({
    data: {
      username: username,
      email: email,
      password: hashedPassword,
      occupation: occupation,
      profile: {
        create: {
          location: location,
          city: city,
        },
      },
      profileImg: {
        create: {
          url: imagePath,
        },
      },
    },
    include: {
      profile:true,
      profileImg: true,
    },
  });
  return newUser;
};
module.exports = {findMany, findById, findByEmail, createUserWithProfile, createUserWithProfileAndImage};
