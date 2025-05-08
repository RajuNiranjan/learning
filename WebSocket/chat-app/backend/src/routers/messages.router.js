import { Router } from "express";
import { authGuard } from "../middleware/auth.middleware.js";
import {
  getUsers,
  getConversation,
  sendMessage,
} from "../controllers/message.controller.js";

export const messageRouter = Router();

messageRouter.get("/get_all_users", authGuard, getUsers);
messageRouter.get("/get_conversation/:receiver_id", authGuard, getConversation);
messageRouter.post("/send_message/:receiver_id", authGuard, sendMessage);
