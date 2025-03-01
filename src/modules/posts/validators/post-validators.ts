import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const postSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).max(500).required(),
  image: Joi.string().uri().optional(),
  tags: Joi.array().items(Joi.string().hex().length(24)).optional(),
});

const validatePost = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export default validatePost;

export const validatePostUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = postSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};
