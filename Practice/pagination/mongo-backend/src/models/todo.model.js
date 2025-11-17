import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  task: { type: String, required: true },
  is_completed: { type: Boolean, default: false },
});

export const TodoModel = model("Todo", todoSchema);
