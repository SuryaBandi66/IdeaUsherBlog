import express from "express";
import container from "../../../container";
import PostController from "../controllers/post-controller";

const router = express.Router();

const postController = container.get(PostController);

router.get("/", (req, res, next) => postController.getPosts(req, res, next));
router.post("/", (req, res, next) => postController.createPost(req, res, next));
router.put("/:id", (req, res, next) =>
  postController.updatePost(req, res, next)
);
router.delete("/:id", (req, res, next) =>
  postController.deletePost(req, res, next)
);

export default router;
