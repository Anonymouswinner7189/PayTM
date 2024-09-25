import mongoose from "mongoose";
import colors from "colors";

const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {})
    .then((res) =>
      console.log(
        `MongoDB Connected: ${res.connection.host}`.cyan.underline.bold
      )
    )
    .catch((err) => {
      console.error(`Error: ${err.message}`.red.underline.bold);
      process.exit(1);
    });
};

export default connectDB;