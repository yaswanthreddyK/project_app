import express from "express";
import {
  createConversation,
  getAllConversations,
  getSingleConversation,
} from "../controllers/conversation.controller.js";

const router = express.Router();

router.get("/", getAllConversations);
router.get("/conversation", getSingleConversation);
router.post("/createConversation", createConversation);

export default router;
