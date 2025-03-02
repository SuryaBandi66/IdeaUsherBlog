import express from "express";
import container from "../../../container";
import { TagController } from "../controllers/tags-controller";

const router = express.Router();
const tagController = container.get(TagController);

router.get("/", (req, res, next) => tagController.getAll(req, res, next));
router.post("/", (req, res, next) => tagController.create(req, res, next));
router.delete("/:id", (req, res, next) => tagController.delete(req, res, next));

export default router;
