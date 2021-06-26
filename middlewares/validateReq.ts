import { NextFunction, Request, Response } from "express";
import {
  validationResult,
  ValidationError,
  ValidationChain,
} from "express-validator";

const formatValidationResult = validationResult.withDefaults({
  formatter: (err: ValidationError) => err.msg,
});

const validateReq = (validator: ValidationChain[]): any[] => [
  validator,
  (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = formatValidationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).json(validationErrors.mapped());
    }
    next();
  },
];

export default validateReq;
