import { body, ValidationChain } from "express-validator";

const createUser: ValidationChain[] = [
  body("email")
    .isLength({ min: 1 })
    .withMessage("Email must not be empty")
    .isEmail()
    .withMessage("Must be a valid email address"),

  body("name").isLength({ min: 1 }).withMessage("Name must not be empty"),

  body("role")
    .isIn(["ADMIN", "USER", "SUPERADMIN", undefined])
    .withMessage(`Role must be one of these: "ADMIN", "USER", "SUPERADMIN"`),
];

export default createUser;
