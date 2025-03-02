import { injectable } from "inversify";
import mongoose from "mongoose";
import { PostRepository } from "../repositories/PostRepository";
import { TagRepository } from "../../tags/repositories/tags.repositor";
import { IPostQueryParamsDTO } from "../dtos/PostQueryParamsDTO";
import { IPostDTO, IPostUpdateDTO } from "../dtos/PostDto";
import { IPost } from "../interfaces/PostInterface";

@injectable()
export class PostService {
  constructor(
    private readonly postRepo: PostRepository,
    private readonly tagRepo: TagRepository
  ) {}

  public async getAllPosts(query: IPostQueryParamsDTO) {
    const {
      page = "1",
      limit = "10",
      sort = "createdAt",
      order = "desc",
      keyword,
      tag,
    } = query;

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    if (isNaN(pageNumber) || pageNumber < 1) {
      throw new Error("Invalid page number");
    }
    if (isNaN(limitNumber) || limitNumber < 1) {
      throw new Error("Invalid limit number");
    }

    const sortOrder = order === "asc" ? 1 : -1;
    const filter: any = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ];
    }

    if (tag) {
      if (!mongoose.Types.ObjectId.isValid(tag)) {
        throw new Error("Invalid tag ID");
      }
      filter.tags = new mongoose.Types.ObjectId(tag);
    }

    const posts = await this.postRepo.getAll(
      filter,
      { [sort]: sortOrder },
      (pageNumber - 1) * limitNumber,
      limitNumber
    );
    const total = await this.postRepo.getCount(filter);

    return { total, page: pageNumber, limit: limitNumber, posts };
  }

  public async createPost(data: IPostDTO) {
    const { title, description, tags } = data;

    if (!title || !description) {
      throw new Error("Title and description are required");
    }

    const tagIds: mongoose.Types.ObjectId[] = [];

    if (tags && Array.isArray(tags)) {
      for (const tagId of tags) {
        if (!mongoose.Types.ObjectId.isValid(tagId)) {
          throw new Error(`Invalid tag ID: ${tagId}`);
        }

        const tagExists = await this.tagRepo.findById(tagId);
        if (!tagExists) {
          throw new Error(`Tag not found: ${tagId}`);
        }
        tagIds.push(new mongoose.Types.ObjectId(tagId));
      }
    }

    return this.postRepo.create({ ...data, tags: tagIds });
  }

  public async updatePost(id: string, data: IPost) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post ID");
    }

    const existingPost = await this.postRepo.getById(id);
    if (!existingPost) {
      throw new Error("Post not found");
    }

    return this.postRepo.updateById(id, data);
  }

  public async deletePost(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid post ID");
    }

    const existingPost = await this.postRepo.getById(id);
    if (!existingPost) {
      throw new Error("Post not found");
    }

    return this.postRepo.deleteById(id);
  }
}
