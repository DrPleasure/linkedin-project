import mongoose from "mongoose";

const { Schema, model } = mongoose;

const likesSchema = new Schema(
  {
    like: {
      type: String,
      required: true,
      enum: ["👍", "😊", "🤓"],
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);


export default model("Like", likesSchema);
