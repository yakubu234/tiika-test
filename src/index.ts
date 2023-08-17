import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user';
import {bookRoutes} from './routes/books';
import {authorRoutes} from './routes/author';

/** parse the dot env and get the port */
dotenv.config({ path: __dirname+'/env/.env' })
const PORT  = process.env.PORT ?? 3000;
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');
const app = express();
app.use(bodyParser.json());

// Specify CORS options
const corsOptions = {
  origin: allowedOrigins,
  methods: 'GET,PUT,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204, // Send a 204 (No Content) status for preflight requests
};

app.use(cors(corsOptions));


app.use('/api/user', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/author', authorRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;