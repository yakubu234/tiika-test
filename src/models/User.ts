import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt"; 
import sequelize from "../db";
import Book from "./Book";

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;

  async comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

User.hasMany(Book, { foreignKey: "author_id" });

export default User;

export async function createUser(userData: { username: string, password: string }): Promise<User> {
  try {
    const existingUser = await User.findOne({ where: { username: userData.username } });

    if (existingUser) {
      throw new Error('Username already exists');
    }

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return User.create({ ...userData, password: hashedPassword });
  } catch (error) {
    // Log the error
    console.error('Error creating user:', error);
    throw error; // Re-throw the error to propagate it further if needed
  }
}

export async function getUserByUsername(username: string): Promise<User | null> {
  return User.findOne({ where: { username } });
}