import { injectable } from "inversify";
import { TagRepository } from "../repositories/tags.repositor";

@injectable()
export class TagService {
  constructor(private readonly tagRepo: TagRepository) {}

  public async getAllTags() {
    return this.tagRepo.getAll();
  }

  public async createTag(name: string) {
    if (!name) {
      throw new Error("Tag name is required");
    }

    const existingTag = await this.tagRepo.findByName(name);
    if (existingTag) {
      throw new Error("Tag already exists");
    }

    return this.tagRepo.create({ name });
  }

  public async deleteTag(id: string) {
    return this.tagRepo.deleteById(id);
  }
}
