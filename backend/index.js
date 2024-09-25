import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import rootRouter from "./routes/index.js";
import { errorHandler} from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(errorHandler);

connectDB();

app.use("/api/v1", rootRouter);

app.listen(process.env.PORT, () => {
  console.log(`App started running on ${process.env.PORT}`);
});
