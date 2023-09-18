const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
const fileUpload = require('express-fileupload');
const prisma = require('./prisma/prisma');
const authRouter = require("./routes/auth.routes");
const { errorHandler } = require("./middlewares/error.middleware");
const { userRouter } = require("./routes/user.routes");
const { profileRouter } = require("./routes/profile.routes");
const { friendRouter } = require("./routes/friend.routes");

// Global config
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use(fileUpload());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user/profiles', profileRouter)
app.use('/api/v1/user/friends', friendRouter)

// Error Handling
app.use(errorHandler);

app.post('/api/v1/test',async(req, res)=>{
  // const { username, email, password, location, occupation, bio } = req.body;
  const newUser = await prisma.UserProfile.findMany({
    include:{
      schooling: true,
    }
  }); 
  res.json(newUser)
})
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

