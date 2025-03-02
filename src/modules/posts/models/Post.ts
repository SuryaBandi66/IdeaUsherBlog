import mongoose, { Schema, Document } from "mongoose";
import { IPost } from "../interfaces/PostInterface";

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", PostSchema);
