// import express from "express";
import express from "express";

import cors from "cors";
import dotenv from "dotenv";
// import postRoutes from "./routes/postRoutes";
import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import postRoutes from "./modules/posts/routes/post-routes";
import tagRoutes from "./modules/tags/routes/tag-routes";
import logger from "./utils/logger";

dotenv.config();

connectDB();

const app = express();

app.use(express.json({ limit: "50mb" }));

app.use(cors());

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api/tags", tagRoutes);
app.use("/api/posts", postRoutes);

app.use(errorHandler);

export default app;
