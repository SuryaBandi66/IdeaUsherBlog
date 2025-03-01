import { Request, Response, NextFunction } from "express";
import Post from "../models/Post";
import logger from "../../../utils/logger";
import { injectable } from "inversify";
import { uploadFile } from "../../../utils/s3";

@injectable()
class PostController {
  public async getPosts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      logger.info("Fetching posts");
      const posts = await Post.find().populate("tags");
      res.status(200).json(posts);
    } catch (error) {
      logger.error("Error fetching posts", error);
      next(error);
    }
  }

  public async createPost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      logger.info("Creating a new post", { body: req.body });
      let imageUrl = "";

      if (req.files && req.files.image) {
        imageUrl = await uploadFile(req.files.image);
        console.log("🚀 ~ PostController ~ imageUrl:", imageUrl);
      }

      const newPost = new Post({ ...req.body, image: imageUrl });
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      logger.error("Error creating post", error);
      next(error);
    }
  }

  public async updatePost(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      logger.info("Updating post", { id: req.params.id, body: req.body });
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedPost) {
        logger.warn("Post not found", { id: req.params.id });
        res.status(404).json({ error: "Post not found" });
        return;
      }
      res.status(200).json(updatedPost);
    } catch (error) {
      logger.error("Error updating post", error);
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
