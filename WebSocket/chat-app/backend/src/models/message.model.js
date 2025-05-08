import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    sender_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    receiver_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    message: {
      type: String,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export const MessageModel = mongoose.model("message", messageSchema);
