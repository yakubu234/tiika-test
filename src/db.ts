import { Sequelize,Options } from "sequelize";

import dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/env/.env' })

const DATABASE_URL = process.env.DATABASE_URL;
const DATABAE_NAME = process.env.DATABAE_NAME;
const DATABASE_USER = process.env.DATABASE_USER;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DB_PASSWORD = process.env.DB_PASSWORD;


let sequelize: Sequelize; // Explicitly type 'sequelize'

interface SequelizeOptions extends Options { // Extend 'Options' interface
  database: string;
  username: string;
  password: string; 
  host: string;
}


if (DATABASE_URL) {
   sequelize = new Sequelize(DATABASE_URL);
}else{

    // Define Sequelize configuration object
    let sequelizeOptions: SequelizeOptions = {
      database: DATABAE_NAME ?? "",
      username: DATABASE_USER ??"",
      password:DB_PASSWORD ?? "",
      host: DATABASE_HOST ?? "",
      dialect: "postgres",
      logging:false
    }
  
   sequelize = new Sequelize(sequelizeOptions);
}

// const modelsToSync = [User, Author, Book];
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
    

    // Synchronize each model
    // Promise.all(modelsToSync.map(model => model.sync({alter: true })))
sequelize
.sync().then(() => {
        console.log('Database synchronized');
      }).catch((error) => {
        console.error('Error synchronizing database:', error);
      });
    
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;
