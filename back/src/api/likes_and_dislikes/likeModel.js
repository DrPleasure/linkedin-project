import mongoose from "mongoose";

const { Schema, model } = mongoose;

const likesSchema = new Schema(
  {
    like: {
      type: String,
      required: true,
      enum: ["👍", "😊", "🤓"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("Like", likesSchema);
