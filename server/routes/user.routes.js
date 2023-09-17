const express = require("express");
const { body, validationResult } = require("express-validator");
const userRouter = express.Router();

//Verify Token