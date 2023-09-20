const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const fileUpload = require("express-fileupload");
const prisma = require("./prisma/prisma");
const authRouter = require("./routes/auth.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const { userRouter } = require("./routes/user.routes");
const { profileRouter } = require("./routes/profile.routes");
const { friendRouter } = require("./routes/friend.routes");

// Global config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(fileUpload());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/user/profiles", profileRouter);
app.use("/api/v1/user/friends", friendRouter);

// Error Handling
app.use(errorHandler);

app.post("/api/v1/test", async (req, res) => {
  // const {  } = req.body;
  // const friend = await prisma.friend.create({
  //   data: {
  //     follower: { connect: { id: parseInt(req.query.followerId) } },
  //     followed: { connect: { id: parseInt(req.query.followedId) } },
  //   },
  // });
  const test = await prisma.friend.findFirst({
    where:{
      followerId:parseInt(req.query.followerId),
      followedId:parseInt(req.query.followedId),
    }
  })
  // const kamal = await prisma.user.findFirst({
  //   where: {
  //     id: parseInt(req.query.followerId),
  //   },
  //   select: {
  //     id: true,
  //     username: true,
  //     email: true,
  //     impressions: true,
  //     occupation: true,
  //     viewedProfile: true,
  //     followers:{
  //       select:{
  //         follower:true
  //       }
  //     },
  //     following:{
  //       select:{
  //         followed:true
  //       }
  //     }
  //   },
  // });

  res.json({ test: test });
});
const port = process.env.PORT || 50001;

prisma
  .$connect()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
