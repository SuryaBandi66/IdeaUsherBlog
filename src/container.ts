import { Container } from "inversify";

import PostController from "./modules/posts/controllers/post-controller";

const container = new Container();
container.bind<PostController>(PostController).toSelf();

export default container;
