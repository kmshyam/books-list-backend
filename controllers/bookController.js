const jwt = require("jsonwebtoken");
const SECRET_KEY = "asdfghjklkjhgfdsa";
const BookModel = require("../models/book-schema");

const getUserByToken = (token) => {
  return new Promise((res, rej) => {
    if (token) {
      const userDetails = jwt.verify(token, SECRET_KEY);
      res(userDetails);
    } else {
      rej("Some went wrong");
    }
  });
};

exports.getAllBooks = async (req, res) => {
  const books = await BookModel.find();
  if (books.length > 0) {
    res.status(200).json({
      status: "Success",
      books,
    });
  } else {
    res.status(200).json({
      status: "Success",
      message: "No books found",
    });
  }
};

exports.getBookById = async (req, res) => {
  const id = req.params.id;
  const book = await BookModel.findOne({ _id: id });
  if (book) {
    res.status(200).json({
      status: "Success",
      book,
    });
  } else {
    res.status(200).json({
      status: "Success",
      message: "No books found",
    });
  }
};

exports.postAddBook = async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  if (user) {
    try {
      const book = await BookModel.create({
        userID: user.userID,
        username: user.username,
        title: req.body.title,
        isbn: req.body.isbn,
        author: req.body.author,
        description: req.body.description,
        published_date: req.body.published_date,
        publisher: req.body.publisher,
        genre: req.body.genre,
      });
      res.status(200).json({
        status: "Success",
        book,
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(500).json({
      status: "Failed",
      message: "Please login to add book",
    });
  }
};

exports.updateBook = async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const id = req.params.id;
  if (user) {
    try {
      const book = await BookModel.updateOne({ _id: id }, req.body);
      res.status(200).json({
        status: "Success",
        book,
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(500).json({
      status: "Failed",
      message: "Please login to update book",
    });
  }
};

exports.deleteBook = async (req, res) => {
  const user = await getUserByToken(req.headers.authorization);
  const id = req.params.id;
  if (user) {
    try {
      await BookModel.deleteOne({ _id: id });
      res.status(200).json({
        status: "Success",
        message: "Book deleted Succesfully",
      });
    } catch (err) {
      res.status(500).json({
        status: "Failed",
        message: err.message,
      });
    }
  } else {
    res.status(500).json({
      status: "Failed",
      message: "Please login to delete book",
    });
  }
};
