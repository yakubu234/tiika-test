import request from 'supertest';
import { expect } from 'chai';
import app from '../src/index';
import sequelize from '../src/db';

describe('Book API Endpoints', () => {
  let accessToken: string;
  let authorId: string;
  let testUsername: string;
  let testPassword: string;
  let bookID: string;

  before(async () => {
    await sequelize.sync();
    // Generate dynamic test username and password
    testUsername = 'testuser_' + Math.random().toString(36).substring(7);
    testPassword = 'test64@$pwd' + Math.random().toString(36).substring(7);

    // Register a new user
    const response = await request(app)
      .post('/api/user/register')
      .send({
        username: testUsername,
        password: testPassword,
        confirm_password: testPassword,
      });

    expect(response.statusCode).to.equal(201);
    expect(response.body.user.username).to.equal(testUsername);
    accessToken = response.body.accessToken;

    // create author 
     const author =  await request(app)
     .post('/api/author')
     .set('Authorization', `Bearer ${accessToken}`)
     .send({name:'author' + Math.random().toString(36).substring(7)});
    expect(author.statusCode).to.equal(201);
    authorId = author.body.author.id;

  });

  it('should fetch all books', async () => {
    const response = await request(app).get('/api/books');
    
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.be.an('object');
  });

  it('should fetch a specific book by ID', async () => {
    // Assuming you have a valid book ID
    const bookId = 1;
    const response = await request(app).get(`/api/books/${bookId}`);
    expect(response.statusCode).to.equal(200);
    expect(response.body).to.have.property('book');
    expect(response.body.book).to.have.property('id');
    expect(response.body.book).to.have.property('Author');
  });

  it('should return a 404 status when fetching a non-existent book by ID', async () => {
    const nonExistentId = '10293029384273747';
    const response = await request(app).get(`/api/books/${nonExistentId}`);
    expect(response.statusCode).to.equal(404);
    expect(response.body.message).to.equal('Book not found');
  });

  it('should create a new book', async () => {
    const newBook = { title: 'New Book Title'  + Math.random().toString(36).substring(7), author_id: authorId , publication_year: "2032"};
    const response = await request(app)
      .post('/api/books')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(newBook);

    expect(response.statusCode).to.equal(201);
    expect(response.body).to.have.property('book');
    expect(response.body.book.title).to.equal(newBook.title);
    bookID = response.body.book.id
  });

  it('should update an existing book', async () => {
    // Assuming you have a valid book ID
    const bookId = bookID;
    const updatedBookData = { title: 'Updated Title'  + Math.random().toString(36).substring(7), book_id:bookId };

    const response = await request(app)
      .put(`/api/books`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send(updatedBookData);

    expect(response.statusCode).to.equal(200);
    expect(response.body.book.id).to.equal(bookId);
    expect(response.body.book.title).to.equal(updatedBookData.title);
  });

  it('should delete an existing book', async () => {
    // Assuming you have a valid book ID
    const bookId = bookID;

    const response = await request(app)
      .delete(`/api/books/${bookId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(response.statusCode).to.equal(204);
  });

  it('should return a 401 status when creating a new book without authentication token', async () => {
    const newBook = { title:  Math.random().toString(36).substring(7)+'New Book Title', author_id: authorId , publication_year: "2032"};

    const response = await request(app).post('/api/books').send(newBook);

    expect(response.statusCode).to.equal(401);
    expect(response.body.message).to.equal('UnAuthenticated Token Required failed');
  });
});
