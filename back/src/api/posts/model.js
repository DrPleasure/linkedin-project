import mongoose from "mongoose";

const { Schema, model } = mongoose;

const postsSchema = new Schema(
  {
    text: { type: String, required: true },
    image: { type: String },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "Like" }],
  },
  {
    timestamps: true, // this option automatically the createdAt and updatedAt fields
  }
);

export default model("Post", postsSchema); // this model is now automagically linked to the "posts" collection, if collection is not there it will be created
