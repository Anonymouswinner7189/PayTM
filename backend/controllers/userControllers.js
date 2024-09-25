import zod from "zod";
import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import Account from "../models/Account.js";
import mongoose from "mongoose";

// Sign Up
const signUpBody = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
});

const userSignUp = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { success } = signUpBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const existingUser = await User.findOne({ userName: req.body.userName });
  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });
  const userId = user._id;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    message: "User created Successfully",
    token: token,
  });
});

// Sign In
const signInBody = zod.object({
  userName: zod.string().email(),
  password: zod.string(),
});

const userSignIn = asyncHandler(async (req, res) => {
  const success = signInBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });
  if (!user) {
    return res.status(401).json({
      message: "Incorrect username or password",
    });
  }

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET
  );
  return res.status(200).json({
    token: token,
  });
});

// Update
const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

const userUpdate = asyncHandler(async (req, res) => {
  const success = updateBody.safeParse(req.body);
  if (!success) {
    res.status(411).json({
      message: "Incorrect Inputs",
    });
  }

  await User.updateOne({ _id: req.userId }, req.body);
  return res.status(200).json({
    message: "User info updated successfully",
  });
});

//Filter users
const userBulk = asyncHandler(async (req, res) => {
  const filter = req.query.filter || "";
  const currentUserId = new mongoose.Types.ObjectId(req.userId);

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  return res.status(200).json({
    user: users
      .filter((user) => !currentUserId.equals(user._id))
      .map((user) => ({
        userName: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
  });
});

export { userSignUp, userSignIn, userUpdate, userBulk };
