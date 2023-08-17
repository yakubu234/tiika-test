import { check, body, ValidationChain } from 'express-validator';
import { NonNullFindOptions } from 'sequelize/types';
import Author from '../models/Author';
import Book from '../models/Book';

//update bookvalidation
export const updateBookValidation: ValidationChain[] = [
    check('publication_year').exists().optional({ checkFalsy: true }).escape(),
    check('title').exists().optional({ checkFalsy: true }).escape().custom(async (value) => {
        const book = await Book.findOne({
            where: {
                title: value
            } 
        });
        if (book) {
          throw new Error('Book title already exists');
        }
        return true;
      }),
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
