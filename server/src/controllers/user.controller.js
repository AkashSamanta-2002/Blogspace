import { User } from "../models/user.model.js";
import { generateToken } from "../services/jwt.service.js";
import { asynchandler } from "../utils/asyncHandler.util.js";
import { errorhandler } from "../utils/errorHandler.util.js";
import { responsehandler } from "../utils/responseHandler.js";
import generator from "generate-password";
import bcrypt from "bcryptjs";
import { uploadOnCloudinary } from '../services/cloudinary.service.js'
const isProduction = process.env.NODE_ENV === "production";

const authCookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  maxAge: 24 * 60 * 60 * 1000,
  path: "/",
};


export const signup = asynchandler(async (req, res, next) => {
  const { name, email, password, bio, avatar } = req.body;

  // Check all fields
  if (!name || !email || !password) {
    return next(new errorhandler("All fields are required", 400));
  }

  // check user already exist or not
  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return next(new errorhandler("User already exist", 400));
  }

  // hash password
  const salt = 10;
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
    bio,
    avatar
  });

  // check user created or not
  const createdUser = await User.findById(newUser?._id, { password: false });

  if (!createdUser) {
    return next(new errorhandler("User creation failed", 400));
  }

  // token assignment in cookies
  const token = generateToken(createdUser);
  res.cookie("token", token, authCookieOptions);

  return res.json(
    new responsehandler(201, "User created successfully", createdUser),
  );
});

export const googelAuth = asynchandler(async (req, res, next) => {
  const { name, email, avatar } = req.body;

  // Check all fields
  if (!name || !email) {
    return next(new errorhandler("All fields are required", 400));
  }

  // check user already exist or not
  const existedUser = await User.findOne({ email }, { password: false });

  // If existed user then return loggedin user
  if (existedUser) {
    // token assignment in cookies
    const token = generateToken(existedUser);
    res.cookie("token", token, authCookieOptions);

    return res
      .status(200)
      .json(new responsehandler(200, "Logged in successfully", existedUser));
  }

  // generate Password
  const password = generator.generate({
    length: 15,
    numbers: true,
  });

  // create user
  const newUser = await User.create({
    name,
    email,
    password,
    avatar,
  });

  // check user created or not
  const createdUser = await User.findById(newUser?._id, { password: false });

  if (!createdUser) {
    return next(new errorhandler("User creation failed", 400));
  }

  // token assignment in cookies
  const token = generateToken(createdUser);
  res.cookie("token", token, authCookieOptions);

  return res.json(
    new responsehandler(201, "User created successfully", createdUser),
  );
});

export const login = asynchandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Check all fields
  if (!email || !password) {
    return next(new errorhandler("All fields are required", 400));
  }

  // check user already exist or not
  const user = await User.findOne({ email });

  if (!user) {
    return next(new errorhandler("Invalid credentials", 400));
  }

  // verify password
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new errorhandler("Invalid credentials", 400));
  }

  // get user details
  const loggedInUser = await User.findById(user?._id, { password: false });

  // token assignment in cookies
  const token = generateToken(loggedInUser);
  res.cookie("token", token, authCookieOptions);

  return res
    .status(200)
    .json(new responsehandler(200, "Logged in successfully", loggedInUser));
});

export const logout = asynchandler((req, res, next) => {
  const user = req.user;

  if (!user) {
    return next(new errorhandler("Token expired login again", 400));
  }

  res
    .clearCookie("token", authCookieOptions)
    .json(new responsehandler(200, "Logged out successfully"));
});

export const getUserProfile = asynchandler((req, res, next) => {
  const user = req.user;
  if (!user) {
    return next(new errorhandler("Token expired login again", 400));
  }

  res.status(200).json(new responsehandler(200, "", user));
});

export const updateUserDetails = asynchandler(async (req, res, next) => {
  let { name, bio, password } = req.body || next(new errorhandler("Updation fields required", 400));
  const path = req.file?.path;

  // Check all fields
  if (!(name || bio || password || path)) {
    return next(new errorhandler("Updation fields are required", 400));
  }

  // Get user from req
  const user = req.user;
  if (!user) {
    return next(new errorhandler("Invalid token", 404));
  }

  const loggedInUser = await User.findOne({ email: user.email });
  if (!loggedInUser) {
    return next(new errorhandler("Invalid token", 404));
  }

  let newPassword = null;
  if (password) {
    // hash password
    const salt = 10;
    newPassword = await bcrypt.hash(password, salt);
  } else newPassword = loggedInUser.password;

  if (!name) {
    name = loggedInUser.name;
  }

  if(!bio) {
    bio = loggedInUser.bio;
  }

  let avatarUrl = "";
  if(path) {
    avatarUrl = await uploadOnCloudinary(path);
  } else {
    avatarUrl = loggedInUser?.avatar || "";
  }

  // update user
  const updatedUser = await User.findOneAndUpdate({_id: loggedInUser._id}, {
    $set: {name, password: newPassword, bio, avatar: avatarUrl}
  })

  // check user created or not
  const newUpdatedUser = await User.findById(updatedUser?._id, { password: false });

  if (!newUpdatedUser) {
    return next(new errorhandler("User updation failed", 400));
  }

  // token assignment in cookies
  const token = generateToken(newUpdatedUser);
  res.cookie("token", token, authCookieOptions);

  return res.json(
    new responsehandler(201, "User updated successfully", newUpdatedUser),
  );
});
