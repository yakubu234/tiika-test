import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import Author from "./Author";

class Book extends Model {
  public id!: number;
  public title!: string;
  public author_id!: number;
  public publication_year!: number;
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
    publication_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    author_id: {
      type: DataTypes.INTEGER,
      references: { model: Author, key: "id" },
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "Book",
  }
);

export default Book;
