import Post from "../models/Post";
import { injectable } from "inversify";
import logger from "../../../utils/logger";
import { PostService } from "../services/post.service";
import { Request, Response, NextFunction } from "express";
import multer from "multer";
import fs from "fs";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

@injectable()
class PostController {
  constructor(private readonly postService: PostService) {}

  public async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Fetching posts", { query: req.query });
      const postsData = await this.postService.getAllPosts(req.query);
      res.status(200).json(postsData);
    } catch (error) {
      next(error);
    }
  }

  public async createPost(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Creating post", { body: req.body });

      let imageBase64: string | undefined = undefined;

      if (req.file) {
        const imageBuffer = fs.readFileSync(req.file.path);
        imageBase64 = imageBuffer.toString("base64");

        fs.unlinkSync(req.file.path);
      }

      const postData = {
        ...req.body,
        image: imageBase64,
        tags: req.body.tags ? JSON.parse(req.body.tags) : [],
      };

      const newPost = await this.postService.createPost(postData);
      res.status(201).json(newPost);
    } catch (error) {
      next(error);
    }
  }

  public async updatePost(req: Request, res: Response, next: NextFunction) {
    try {
      logger.info("Updating post", { id: req.params.id, body: req.body });
      const updatedPost = await this.postService.updatePost(
        req.params.id,
        req.body
      );
      res.status(200).json(updatedPost);
    } catch (error) {
      next(error);
    }
  }

  public async deletePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      logger.info("Deleting post", { id: req.params.id });
      const deletedPost = await Post.findByIdAndDelete(req.params.id);
      if (!deletedPost) {
        logger.warn("Post not found", { id: req.params.id });
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      logger.error("Error deleting post", error);
      next(error);
    }
  }
}

export default PostController;
