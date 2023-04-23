const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");

router.get("/", BookController.getAllBooks);

router.get("/:id", BookController.getBookById);

router.post("/add", BookController.postAddBook);

router.put("/edit/:id", BookController.updateBook);

router.delete("/delete/:id", BookController.deleteBook);

module.exports = router;
