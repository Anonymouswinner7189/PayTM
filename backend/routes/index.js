import accountRouter from "./account.js";
import userRouter from "./user.js";
import express from "express";

const rootRouter = express.Router();

rootRouter.use("/user", userRouter);
rootRouter.use("/account",accountRouter);

export default rootRouter;
