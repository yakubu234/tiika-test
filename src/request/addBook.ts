import { check, body, ValidationChain } from 'express-validator';
import Author from '../models/Author';
import Book from '../models/Book';

// add book validation
export const createBookValidation: ValidationChain[] = [
    check("title").not().isEmpty().trim().escape().withMessage("Title is required").custom(async (value) => {
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
    check("publication_year").not().isEmpty().trim().escape().withMessage("publication year is required"),
    check("author_id").not().isEmpty().trim().escape().withMessage("Author ID  is required").custom(async (value) => {
        const author = await Author.findOne({
            where: {
                id: value
            } 
        });
        if (!author) {
          throw new Error('Author ID does not exist');
        }
        return true;
      }),
];
