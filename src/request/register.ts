import { check, body, ValidationChain } from 'express-validator';

import User from '../models/User';

// user registration validation
export const registerValidation: ValidationChain[] = [
    check('username').notEmpty().withMessage('Title is required').custom(async (value) => {
        const user = await User.findOne({
            where: {
                username: value
            } 
        });
        if (user) {
          throw new Error('Username already exists');
        }
        return true;
      }),
    check("password", "Password fiel is required")
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .withMessage("your password should have minimum of 8 characters")
    .matches(/\d/)
    .withMessage("your password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("your password should have at least one sepcial character"),
    check("confirm_password", "Passwords do not match").custom(
        (value, { req }) => value === req.body.password
    )
];

