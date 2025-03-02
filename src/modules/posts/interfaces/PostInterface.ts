import mongoose from "mongoose";

export interface IPost {
  title: string;
  description: string;
  image?: string;
  tags?: mongoose.Types.ObjectId[];
}
