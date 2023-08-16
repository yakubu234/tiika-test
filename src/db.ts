import { Sequelize,Options } from "sequelize";
import dotenv from 'dotenv';
dotenv.config({ path: __dirname+'/env/.env' })

const { DATABASE_URL,DATABAE_NAME ,DATABASE_USER,DATABASE_HOST,DB_PASSWORD} = process.env;
let sequelize: Sequelize; // Explicitly type 'sequelize'

interface SequelizeOptions extends Options { // Extend 'Options' interface
  database: string;
  username: string;
  password: string; 
  allowNull: boolean;
  host: string;
}


if (DATABASE_URL) {
   sequelize = new Sequelize(DATABASE_URL);
}else{

    // Define Sequelize configuration object
    let sequelizeOptions: SequelizeOptions = {
      database: DATABAE_NAME,
      username: DATABASE_USER,
      password:DB_PASSWORD,
      host: DATABASE_HOST,
      dialect: "postgres",
      allowNull: true,
      logging:false
    }
  
   sequelize = new Sequelize(sequelizeOptions);
}


sequelize
  .authenticate()
  .then((conn) => {
    console.log("Connection has been established successfully.");
      sequelize.sync().then(() => {
        console.log('Database synchronized');
      }).catch((error) => {
        console.error('Error synchronizing database:', error);
      });
    
  })
  .catch((error) => {
    console.error("Unable to connect to the database:", error);
  });

export default sequelize;
