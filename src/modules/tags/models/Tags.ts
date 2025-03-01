import mongoose, { Schema, Document } from "mongoose";

export interface ITag extends Document {
  name: string;
}

const TagSchema = new Schema<ITag>({
  name: { type: String, unique: true, required: true },
});

export default mongoose.model<ITag>("Tag", TagSchema);
