import Author from "./Author";
import Book from "./Book";
import User from "./User";

// Author.belongsTo(User, { foreignKey: "user_id" });
Author.hasMany(Book, { foreignKey: "author_id"});
Book.belongsTo(Author, { foreignKey: "author_id" , targetKey: 'id' });
