import { check, body, ValidationChain } from 'express-validator';

// login validation
export const loginValidation: ValidationChain[] = [
    check('username').notEmpty().withMessage('username is required'),
    check("password", "Password fiel is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("your password should have minimum of 8 characters")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"),
  
];
