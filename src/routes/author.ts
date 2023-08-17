import express from 'express';
import {BookController } from '../controllers/book';
import { authenticateToken } from '../middleware/auth';
import { addAuthorValidation } from '../request/addAuthor';
import { validate } from '../middleware/ValidatoreMiddleware';

const router = express.Router();

router.get('/', authenticateToken, BookController.getAuthor);
router.post('/', authenticateToken,validate(addAuthorValidation), BookController.addAuthor);

export { router as authorRoutes };
