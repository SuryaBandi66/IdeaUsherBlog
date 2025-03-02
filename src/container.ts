import { Container } from "inversify";

import PostController from "./modules/posts/controllers/post-controller";
import { PostService } from "./modules/posts/services/post.service";
import { PostRepository } from "./modules/posts/repositories/PostRepository";
import { TagController } from "./modules/tags/controllers/tags-controller";
import { TagService } from "./modules/tags/services/tags.service";
import { TagRepository } from "./modules/tags/repositories/tags.repositor";

const container = new Container();

//Post Related Configuration
container.bind<PostController>(PostController).toSelf();
container.bind<PostService>(PostService).toSelf();
container.bind<PostRepository>(PostRepository).toSelf();

//Tags Related Configuration
container.bind<TagController>(TagController).toSelf();
container.bind<TagService>(TagService).toSelf();
container.bind<TagRepository>(TagRepository).toSelf();

export default container;
