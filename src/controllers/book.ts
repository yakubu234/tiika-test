import { Request, Response } from 'express';
import  handleResponse  from "../utils/response";
import Book from '../models/Book';
import Author from '../models/Author';
import '../models/associations';

const BookController = {

  // get all books 
  async getAllBooks(req: Request, res: Response) {
    try {
        const books = await Book.findAll({ include: Author });

        if (books.length === 0) {
          handleResponse(res, {status:'success', message:  'there are no book in the database yet',books}, 200);
        }

        handleResponse(res, {status:'success', message:  'all books fetched successfully',books}, 200);
    } catch (error:any) {
        if (error.name == "SequelizeDatabaseError" || error.name == "SequelizeNotFoundError" ) {
            handleResponse(res, {status:'error', message:  'Book does not exist'}, 404);
          } else {
            handleResponse(res, {error}, 500);;
          }
    }
  },

  // get book by id
  async getBookById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const book = await Book.findByPk(id, { include: Author });
      if (!book) {
        handleResponse(res, {status:'error', message: 'Book not found'}, 404);
      }
      handleResponse(res, {status:'success', message: 'Book fethed successfully' ,book}, 200);
    } catch (error) {
        handleResponse(res, {status:'error', message: 'Server error'}, 500);
    }
  },

  // add book
  async addBook(req: Request, res: Response) {
    const { title, publication_year, author_id } = req.body;
    try {
      const book = await Book.create({ title, publication_year, author_id });
      handleResponse(res, {status:'success', message: 'Book added successfully' ,book}, 201);

    } catch (error) {
        handleResponse(res, {status:'error', message: 'Failed to add book'}, 400);
    }
  },

  // add author
  async addAuthor(req: Request, res: Response) {
    const { name} = req.body;
    try {
      const author = await Author.create({ name });
      handleResponse(res, {status:'success', message: 'Book added successfully' ,author}, 201);

    } catch (error) {
        handleResponse(res, {status:'error', message: 'Failed to add book'}, 400);
    }
  },

  // get author
  async getAuthor(req: Request, res: Response) {
      try {
        const authors = await Author.findAll({ include: Book });
        handleResponse(res, {authors}, 200);
    } catch (error:any) {
        if (error.name == "SequelizeDatabaseError" || error.name == "SequelizeNotFoundError" ) {
            handleResponse(res, {status:'error', message:  'authors does not exist'}, 404);
          } else {
            handleResponse(res, {error}, 500);;
          }
    }
  },

  async updateBook(req: Request, res: Response) {
    
  },

  async deleteBook(req: Request, res: Response) {
   
  }
};

export { BookController };
