import { Request, Response, NextFunction } from "express";
import { injectable } from "inversify";
import { TagService } from "../services/tags.service";

@injectable()
export class TagController {
  constructor(private readonly tagService: TagService) {}

  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const tags = await this.tagService.getAllTags();
      res.status(200).json(tags);
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const tag = await this.tagService.createTag(req.body.name);
      res.status(201).json(tag);
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await this.tagService.deleteTag(req.params.id);
      res.status(200).json({ message: "Tag deleted successfully" });
    } catch (error) {
      next(error);
    }
  }
}
