import asyncHandler from "express-async-handler";
import Account from "../models/Account.js";
import mongoose from "mongoose";

// Get User Balance
const getBalance = asyncHandler(async (req, res) => {
  const account = await Account.findOne({ userId: req.userId });
  return res.status(200).json({
    balance: account.balance,
  });
});

// Transfer Money
const moneyTransfer = asyncHandler(async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  const { amount, to } = req.body;

  const fromAccount = await Account.findOne({ userId: req.userId }).session(
    session
  );
  if (!fromAccount || fromAccount.balance < amount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Insufficent Balance",
    });
  }

  const toAccount = await Account.findOne({ userId: to }).session(session);
  if (!toAccount) {
    await session.abortTransaction();
    return res.status(400).json({
      message: "Invalid Receiver Account",
    });
  }

  await Account.updateOne(
    { userId: req.userId },
    { $inc: { balance: -amount } }
  ).session(session);
  await Account.updateOne(
    { userId: to },
    { $inc: { balance: amount } }
  ).session(session);

  await session.commitTransaction();

  return res.status(200).json({
    message: "Transfer Successful",
  });
});

export { getBalance, moneyTransfer };
