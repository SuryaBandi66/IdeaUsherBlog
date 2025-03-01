import express from "express";
import PostController from "../controllers/post-controller";
import container from "../../../container";

const router = express.Router();

const postController = container.get(PostController);

router.get("/", (req, res, next) => postController.getPosts(req, res, next));
router.post("/", (req, res, next) => postController.createPost(req, res, next));
// router.put("/:id", updatePost);
// router.delete("/:id", deletePost);

export default router;
