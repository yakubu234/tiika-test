import express from 'express';
import {BookController } from '../controllers/book';
import { authenticateToken } from '../middleware/auth';
import { createBookValidation } from '../request/addBook';
import { updateBookValidation } from '../request/updateBook';
import { deleteBookValidation } from '../request/deleteBook';
import { validate } from '../middleware/ValidatoreMiddleware';

const router = express.Router();

router.get('/', BookController.getAllBooks);
router.get('/:id', BookController.getBookById);
router.post('/', authenticateToken,validate(createBookValidation), BookController.addBook);
router.put('/:id', authenticateToken, validate(updateBookValidation) ,BookController.updateBook);
router.delete('/:id', authenticateToken, validate(deleteBookValidation), BookController.deleteBook);

export { router as bookRoutes };
