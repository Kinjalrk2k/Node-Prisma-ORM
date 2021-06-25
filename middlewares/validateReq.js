const { validationResult } = require("express-validator");

const formatValidationResult = validationResult.withDefaults({
  formatter: (err) => err.msg,
});

const validateReq = (validator) => [
  validator,
  (req, res, next) => {
    const validationErrors = formatValidationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.mapped());
    }
    next();
  },
];

module.exports = validateReq;
