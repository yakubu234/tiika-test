import { ValidationChain, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import  handleResponse  from "../utils/response";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // Run all specified validations on the request
    await Promise.all(validations.map(validation => validation.run(req)));

    // Check for validation errors
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      // If there are no validation errors, move to the next middleware
      return next();
    }

    // If there are validation errors, respond with a 400 Bad Request status and the errors
    handleResponse(res, {status:'error', message: 'Request validation error',errors: errors.array()}, 422);
  };
};
