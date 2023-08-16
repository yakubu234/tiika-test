import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
// import Author from "./Author";

class Book extends Model {
  public id!: number;
  public title!: string;
  public author_id!: number;
}

Book.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

export default Book;
