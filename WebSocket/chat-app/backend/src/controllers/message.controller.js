import { MessageModel } from "../models/message.model.js";
import { UserModel } from "../models/user.model.js";
import cloudinary from "../utils/cloudinary.js";
import { getReceiverSocketId, io } from "../utils/socket.js";
export const getUsers = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const users = await UserModel.find({ _id: { $ne: user_id } })
      .select("-password")
      .sort({ user_name: 1 });

    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }

    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

export const getConversation = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { receiver_id } = req.params;

    const conversation = await MessageModel.find({
      $or: [
        { sender_id: user_id, receiver_id },
        { sender_id: receiver_id, receiver_id: user_id },
      ],
    }).sort({ createdAt: -1 });

    return res.status(200).json(conversation);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const sendMessage = async (req, res, next) => {
  try {
    const { receiver_id } = req.params;
    const { user_id } = req.user;
    const { message, image } = req.body;

    if (!message && !image) {
      return next({
        statusCode: 400,
        message: "Message or image is required",
      });
    }

    let imageURL;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageURL = uploadResponse.secure_url;
    }

    const newMessage = new MessageModel({
      sender_id: user_id,
      receiver_id,
      message: typeof message === "string" ? message : message?.message || "",
      image: imageURL,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiver_id);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
