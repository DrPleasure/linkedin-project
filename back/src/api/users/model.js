import mongoose from "mongoose";

const { Schema, model } = mongoose;

const usersSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    bio: { type: String, required: true },
    title: { type: String, required: true },
    area: { type: String, required: true },
    image: { type: String },
    experiences: [
      {
        role: { type: String, required: true },
        company: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        description: { type: String, required: true },
        area: { type: String, required: true },
        image: { type: String },
      },
    ],
    posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    likedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    dislikedPosts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  },
  {
    timestamps: true, // this option automatically the createdAt and updatedAt fields
  }
);

export default model("User", usersSchema); // this model is now automagically linked to the "users" collection, if collection is not there it will be created
