const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const prisma = require("../prisma/prisma");
const CustomError = require("../exceptions/CustomError");
const {
  findByEmail,
  createUserWithProfileAndImage,
  createUserWithProfile,
  findById,
} = require("../repositories/user.repository");

const registerUser = async (user, pictuer) => {
  const url = path.join(__dirname, "..", "public/assets/");
  const { username, email, password, location, occupation, bio } = await user;

  //Verify user already exits
  const existingUser = await findByEmail(email);
  if (existingUser) {
    //If already exist throw error
    throw new CustomError("User Already Exist", 409);
  }
  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  if (pictuer?.profileImg) {
    console.log('tttttttttttttttttttttt')
    const { profileImg } = pictuer;
    // I will modify this code later
    // add the photo to flicker
    // get photo flicker url
    await profileImg.mv(url + profileImg.name);
    const imagePath = path.join(url, profileImg.name);
    //Create User With Profile And Image
    const newUser = await createUserWithProfileAndImage({
      username,
      email,
      hashedPassword,
      location,
      occupation,
      bio,
      imagePath,
    });
    return newUser;
  } else {
    console.log('yyyyyyyyyyyyyyyyyyyyyyy')

    // Create User With Profile
    const newUser = await createUserWithProfile({
      username,
      email,
      hashedPassword,
      location,
      occupation,
      bio,
    });
    return newUser;
  }
};

const loginUser = async (user) => {
  const { email, password } = user;
  //Verify user exits
  const existingUser = await findByEmail(email);
  if (!existingUser) {
    //If already exist throw error
    throw new CustomError("Credential not correct ", 401);
  }
  //compare the provider passwrd with the stored password
  const isMatch = await bcrypt.compare(password, existingUser.password);
  if (!isMatch) {
    //if dasen't mach throw error
    throw new CustomError("Authentication failed not correct ", 401);
  }
  //create an access toekn for user
  const accessToken = jwt.sign(
    {
      userInfo: {
        id: existingUser.id,
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

    //create an refresh toekn for user
    const refreshToken = jwt.sign(
      {
        userInfo: {
          id: existingUser.id,
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
      username: existingUser.username,
      email: existingUser.email
    }
};

const refreshUuser =  async (cookie) => {
  if (!cookie?.jwt) {
    throw new CustomError("JWT cookie is missing", 401);
  }
  const refreshToken = cookie.jwt;
  let access_token;
  await jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (error, decoded) => {
      if (error) {
        throw new CustomError("Invalid Token", 401);
      }
      const existingUser = await findById(decoded.userInfo.id);
      if (!existingUser) {
        throw new error("User not found", 401);
      }
      //create access token for user
      access_token = jwt.sign(
        {
          userInfo: {
            id: existingUser.id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
    }
  );
  return access_token;
}
module.exports = { registerUser, loginUser, refreshUuser };
