import { Model, DataTypes } from "sequelize";
import sequelize from "../db";
import User from "./User";
class Author extends Model {
  public id!: number;
  public name!: string;
  public user_id!: number;
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
    }
  },
  {
    sequelize,
    modelName: "Author",
  }
);


export default Author;
