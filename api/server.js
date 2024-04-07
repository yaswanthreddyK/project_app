import dotenv from "dotenv";
dotenv.config({path: path.resolve('./.env')});
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/user.route.js";
import jobRoute from "./routes/job.route.js";
import projectRoute from "./routes/project.route.js";
import conversationRoute from "./routes/conversation.route.js";
import offerRoute from "./routes/offer.route.js";
import messageRoute from "./routes/message.route.js";
import proposalRouter from "./routes/proposal.route.js";
import paymentRouter from "./routes/payment.route.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import {  loginUser, registerUser, verifyEmail } from "./controllers/user.controller.js";
import verifyJWT from "./middleware/verifyJWT.js";
import path from "path"

const app = express();
mongoose.set("strictQuery", true);

const connect = async () => {
  try {
     mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to mongoDB!");
  } catch (error) {
    console.log(error);
    process.exit(1)
  }
};


app.use(cors({ origin: process.env.ORIGIN, credentials: true }));
app.use(express.json({limit: '5mb'}));
app.use(cookieParser());
app.use(express.urlencoded({extended: true, limit: '3mb'}))
app.use(express.static("public"))
app.use("/api/login",loginUser)
app.use("/api/signup", registerUser)
app.use("/api/users",verifyJWT, userRoute);
app.use("/api/jobs",verifyJWT,jobRoute)
app.use("/api/conversations",verifyJWT, conversationRoute);
app.use("/api/messages",verifyJWT, messageRoute);
app.use("/api/projects",verifyJWT,projectRoute)
app.use("/api/proposals",verifyJWT, proposalRouter)
app.use("/api/offers",verifyJWT,offerRoute)
app.use('/api/payments',verifyJWT, paymentRouter)

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(process.env.PORT, () => {
  connect();
  console.log(`Backend server is running! PORT: ${process.env.PORT}`);
});


