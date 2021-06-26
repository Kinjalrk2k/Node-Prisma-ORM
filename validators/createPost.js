const { body } = require("express-validator");

module.exports = [
  body("title").isLength({ min: 1 }).withMessage("Title must not be empty"),
];
