import { injectable } from "inversify";
import Tag, { ITag } from "../models/Tags";

@injectable()
export class TagRepository {
  public async getAll() {
    return Tag.find();
  }

  public async findByName(name: string) {
    return Tag.findOne({ name });
  }

  public async findById(id: string): Promise<ITag | null> {
    return Tag.findById(id);
  }
  public async create(data: any) {
    return new Tag(data).save();
  }

  public async deleteById(id: string) {
    return Tag.findByIdAndDelete(id);
  }
}
