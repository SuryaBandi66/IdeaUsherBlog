import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import errorHandler from "./middlewares/errorHandler";
import postRoutes from "./modules/posts/routes/post-routes";
import tagRoutes from "./modules/tags/routes/tag-routes";
import logger from "./utils/logger";

dotenv.config();

connectDB();

const app = express();

app.use("/uploads", express.static("uploads"));
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

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
