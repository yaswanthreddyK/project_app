import express from "express";
import {
  createMessage,
  getMessages
} from "../controllers/message.controller.js";

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);

export default router;
