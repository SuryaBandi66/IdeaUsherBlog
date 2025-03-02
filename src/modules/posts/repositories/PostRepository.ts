import { injectable } from "inversify";
import Post from "../models/Post";
import mongoose from "mongoose";
import { IPost } from "../interfaces/PostInterface";

@injectable()
export class PostRepository {
  public async getAll(filter: any, sort: any, skip: number, limit: number) {
    return Post.find(filter)
      .populate("tags")
      .sort(sort)
      .skip(skip)
      .limit(limit);
  }

  public async getCount(filter: any): Promise<number> {
    return Post.countDocuments(filter);
  }

  public async create(data: Partial<IPost>): Promise<IPost> {
    return new Post(data).save();
  }

  public async updateById(
    id: string,
    data: Partial<IPost>
  ): Promise<IPost | null> {
    return Post.findByIdAndUpdate(id, data, { new: true });
  }

  public async deleteById(id: string): Promise<IPost | null> {
    return Post.findByIdAndDelete(id);
  }

  public async getById(id: string): Promise<IPost | null> {
    return Post.findById(id);
  }
}
