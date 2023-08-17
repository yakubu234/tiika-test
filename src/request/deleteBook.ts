import { check, body, ValidationChain } from 'express-validator';
import Book from '../models/Book';

//update bookvalidation
export const deleteBookValidation: ValidationChain[] = [
    check('publication_year').exists().optional({ checkFalsy: true }).escape(),
      check('book_id').notEmpty().withMessage('Book ID is required').custom(async (value) => {
        const book = await Book.findOne({
            where: {
                id: value
            } 
        });
        if (!book) {
          throw new Error('Book id does not exist');
        }
        return true;
      }),
];
