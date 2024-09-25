import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  getBalance,
  moneyTransfer,
} from "../controllers/accountControllers.js";

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getBalance);
accountRouter.post("/transfer", authMiddleware, moneyTransfer);

export default accountRouter;
