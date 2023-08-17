# tilka-test
# Project: Bookstore API

## About the Project

### General

**Required Skill(s):** Node.js, Express.js, TypeScript, Postgres, Docker, Docker Compose, VPS/AWS App Runner

### Requirements

- User Authentication: Registration and login for users.
- Database Models: Models for User, Book, and Author.
- Relationships: Each Author can have multiple Books, but each Book belongs to only one Author.

### API Endpoints

The application provides the following API endpoints:

- Get a list of all books (`GET /api/books`)
- Get detailed information about a single book (`GET /api/books/{id}`)
- Add a new book (`POST /api/books`)
- Update a book's information (`PUT` or `PATCH /api/books/{id}`)
- Delete a book (`DELETE /api/books/{id}`)

### API Authentication

- The `POST`, `PUT`/`PATCH`, and `DELETE` endpoints are protected by token-based authentication.
- Only logged-in users can perform these operations.

## How to Set Up the Project

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/yakubu234/tiika-test
   cd tiika-test
2. **Install Dependencies:**

To install the necessary dependencies, run the following command:

```bash
npm install

# Configure Environment Variables:

3. **Copy the environment variables from `root/env/.env.example`. then**
4. **Create a folder `dist/env` if not found, and place the copied `.env` file there.**
5. **Set all variables as required.**

# Database Variables:

- If `DATABASE_URL` is set in the `.env`, other DB variables are not necessary
  (`DATABASE_NAME`, `DATABASE_USER`, `DATABASE_HOST`, `DB_PASSWORD`).
- If `DATABASE_URL` is not set, set `DATABASE_NAME`, `DATABASE_USER`, `DATABASE_HOST`,
  and `DB_PASSWORD` in the `.env`.

# CORS Policy:

- Set `ALLOWED_ORIGINS` separated by commas, e.g.,
  `ALLOWED_ORIGINS=https://example1.com,https://example2.com`.

# Install PostgreSQL:

- Install PostgreSQL on your machine. Refer to [`install_postgress.md`](./install_postgress.md) file for
  detailed installation instructions.




## Unit Testing:

Test cases can be located in the `tests/` directory.

To execute the tests, follow these steps:

1. **Open a terminal.**
2. **Navigate to the root directory of your project.**
3. **Run the following command:**

```bash
npx mocha -r ts-node/register tests/**/*.test.ts



8. Compilation and Execution:

- Compile TypeScript code with:
  ```
  npx tsc
  ```
- Start the application with:
  ```
  npx nodemon dist/index.js
  ```
 or copy the below code

# Step 8: Compilation and Execution

Once you have configured the environment variables, installed dependencies, and set up the database, you are ready to compile and run the TypeScript code.

### Compile TypeScript Code

Use the following command to transpile the TypeScript code into JavaScript:

```bash
npx tsc


## Documentation

- API documentation:
  [Postman Documentation](https://documenter.getpostman.com/view/12538701/2s9Y5R2mcr)

- Swagger Documentation:
  [Swagger](https://swagger.sample.com)

## file tree
- root_folder/
    - dist/
        (compiled TypeScript files)
    - node_modules/
        (dependencies)
    - src/
        - controllers/
            - book.ts
            - user.ts
        - env/
            - .env
            - .env.example
        - middleware/
            - Auth.js
        - models/
            - Author.ts
            - User.ts
            - Book.ts
        - request/
            - addAuthor.ts
            - addBook.ts
            - login.ts
            - register.ts
            - updateBook.ts
        - routes/
            - author.ts
            - books.ts
            - user.ts
        - utils/
            - response.ts
        - db.ts (postgres database connection file with sequelize orm)
        - index.ts (typescript main file, the initialization/entry point)
    - test/
        - authentication.test.ts
        - book.test.ts
    - .gitingore
    - install_postgress.md
    - mocha.opts
    - package-lock.json
    - package.json
    - README.md
    - tsconfig.json

