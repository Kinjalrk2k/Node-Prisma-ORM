import { body, ValidationChain } from "express-validator";

const createPost: ValidationChain[] = [
  body("title").isLength({ min: 1 }).withMessage("Title must not be empty"),
];

export default createPost;
