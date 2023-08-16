import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import {createUser} from "./models/User";
/** parse the dot env and get the port */
dotenv.config({ path: __dirname+'/env/.env' })
const { PORT } = process.env ?? 3000;

const app = express();

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


export default app;