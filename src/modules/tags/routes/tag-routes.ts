import express from "express";
import { createTag, deleteTag, getTags } from "../controllers/tags-controller";
import validateTag from "../validators/tags-validator";

const router = express.Router();

router.get("/", validateTag, getTags);
router.post("/", createTag);

export default router;
