import express, { urlencoded } from "express";
import mongoose from "mongoose";
import route from "./routes/route.js";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect("mongodb+srv://sananadimshah50:sana123@cluster1.2cylsby.mongodb.net")
  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));
app.use("/", route);

app.listen(3000 || process.env.PORT, () => {
  console.log("Server is running " + ("3000 PORT" || process.env.PORT));
});
