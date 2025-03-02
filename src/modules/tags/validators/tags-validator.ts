import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const tagSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
});

const validateTag = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = tagSchema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return;
  }
  next();
};

export default validateTag;
