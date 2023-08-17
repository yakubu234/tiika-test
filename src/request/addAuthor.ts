import { check, body, ValidationChain } from 'express-validator';
import Author from '../models/Author';

// add book validation
export const addAuthorValidation: ValidationChain[] = [
    check("name").not().isEmpty().trim().escape().withMessage("Author ID  is required").custom(async (value) => {
        const author = await Author.findOne({
            where: {
                name: value
            } 
        });
        if (author) {
          throw new Error('Author name already exist');
        }
        return true;
      }),
];
