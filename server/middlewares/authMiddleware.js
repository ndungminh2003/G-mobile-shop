const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const expressAsyncHandler = require("express-async-handler");

const authMiddleware = expressAsyncHandler(async (req, res, next) => {
  let accessToken;
  if (req?.headers?.authorization?.startsWith("Bearer")) {
    accessToken = req.headers.authorization.split(" ")[1];
    try {
      if (accessToken) {
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.id);
        req.user = user;
        next();
      } else {
        throw new Error("Not Authorized");
      }
    } catch (error) {
      throw new Error("Not Authorized token expired, Please login again");
    }
  } else {
    throw new Error("There is no token attached to header");
  }
});

const isAdmin = asyncHandler(async (req, res, next) => {
  const { email } = req.user;
  const manageMember = await User.findOne({ email });
  if (manageMember.role !== "admin" && manageMember.role !== "salesperson") {
    throw new Error("You are not an admin or salesperson");
  } else {
    next();
  }
});

module.exports = { authMiddleware, isAdmin };
