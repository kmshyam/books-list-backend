const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  userID: { type: String },
  username: { type: String },
  title: { type: String, required: true },
  isbn: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String, required: true },
  published_date: { type: String, required: true },
  publisher: { type: String, required: true },
  genre: { type: String, required: true },
});

const bookModel = mongoose.model("Book", bookSchema);

module.exports = bookModel;
