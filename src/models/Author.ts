import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
// import Book from "./Book";

class Author extends Model {
  public id!: number;
  public name!: string;
}

Author.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Author",
  }
);

export default Author;
