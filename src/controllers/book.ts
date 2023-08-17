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
          return handleResponse(res, {status:'success', message:  'there are no book in the database yet',books}, 200);
        }

        return handleResponse(res, {status:'success', message:  'all books fetched successfully',books}, 200);
    } catch (error:any) {
        if (error.name == "SequelizeDatabaseError" || error.name == "SequelizeNotFoundError" ) {
           return handleResponse(res, {status:'error', message:  'Book does not exist'}, 404);
          } else {
           return handleResponse(res, {error}, 500);;
          }
    }
  },

  // get book by id
  async getBookById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const book = await Book.findByPk(id, { include: Author });
      if (!book) {
      return  handleResponse(res, {status:'error', message: 'Book not found'}, 404);
      }
      return handleResponse(res, {status:'success', message: 'Book fethed successfully' ,book}, 200);
    } catch (error) {
        return handleResponse(res, {status:'error', message: 'Server error'}, 500);
    }
  },

  // add book
  async addBook(req: Request, res: Response) {
    const { title, publication_year, author_id } = req.body;
    try {
      const book = await Book.create({ title, publication_year, author_id });
      return handleResponse(res, {status:'success', message: 'Book added successfully' ,book}, 201);

    } catch (error) {
      return handleResponse(res, {status:'error', message: 'Failed to add book'}, 400);
    }
  },

  // add author
  async addAuthor(req: Request, res: Response) {
    const { name} = req.body;
    try {
      const author = await Author.create({ name });
      return handleResponse(res, {status:'success', message: 'Book added successfully' ,author}, 201);

    } catch (error) {
      return handleResponse(res, {status:'error', message: 'Failed to add book'}, 400);
    }
  },

  // get author
  async getAuthor(req: Request, res: Response) {
      try {
        const authors = await Author.findAll({ include: Book });
        return handleResponse(res, {status:'success', message: 'authors fetched successfully' , authors}, 200);
    } catch (error:any) {
        if (error.name == "SequelizeDatabaseError" || error.name == "SequelizeNotFoundError" ) {
            return handleResponse(res, {status:'error', message:  'authors does not exist'}, 404);
          } else {
            return handleResponse(res, {status:'error', message: 'Server error occured' , error}, 500);;
          }
    }
  },

  async updateBook(req: Request, res: Response) {
    const { title, publication_year,book_id } = req.body;
    try {
      const book = await Book.findByPk(book_id);
      if (!book) {
        return  handleResponse(res,{status:'error', message: 'Unable to update book'  },400);
      }
      
      if (title !== undefined) {
        book.title = title;
      }
  
      if (publication_year !== undefined) {
        book.publication_year = publication_year;
      }

      await book.save();
      return handleResponse(res,{status:'error', message: 'book updated successfully',book  },200);
    } catch (error) {
     return  handleResponse(res,{ status:'success', message:  'Failed to update book' ,error},400);
    }
  },

  async deleteBook(req: Request, res: Response) {
    const { book_id } = req.params;
    try {
      const book = await Book.findByPk(book_id);
      if (!book) {
       return handleResponse(res,{status:'error', message: 'Book not found' },404);
      }
      await book.destroy();
      return handleResponse(res,{ status:'success',message: 'Book deleted successfully' },204);
    } catch (error) {
      return handleResponse(res,{ status:'error' ,message: 'Failed to delete book' },400);
    }
  }
};

export { BookController };
