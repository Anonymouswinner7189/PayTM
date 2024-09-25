import express from "express";
import User from "../models/User.js";
import {
  userSignUp,
  userSignIn,
  userUpdate,
  userBulk,
} from "../controllers/userControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.post("/signup", userSignUp);
userRouter.post("/signin", userSignIn);
userRouter.put("/update", authMiddleware, userUpdate);
userRouter.get("/bulk", authMiddleware, userBulk);

export default userRouter;
