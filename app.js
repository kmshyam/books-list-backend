const express = require("express");
const userRoutes = require("./routes/user-route");
const bookRoutes = require("./routes/book-route");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(
    "mongodb+srv://kmshyam7991:shyamsrinivasan@cluster0.0aomaua.mongodb.net/books-list?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With, Content-Type, Accept, Origin, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, PATCH, DELETE"
  );
  next();
});

app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);

app.listen(8080, () => console.log("Server is running up at 8080"));
