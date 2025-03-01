import { Request, Response } from "express";
import Tag from "../models/Tags";

export const getTags = async (req: Request, res: Response) => {
  try {
    const tags = await Tag.find();
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createTag = async (req: Request, res: Response) => {
  try {
    const newTag = new Tag(req.body);
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    res.status(400).json({ error: "Bad Request" });
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  try {
    const deletedTag = await Tag.findByIdAndDelete(req.params.id);
    if (!deletedTag) return res.status(404).json({ error: "Tag not found" });
    res.status(200).json({ message: "Tag deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
