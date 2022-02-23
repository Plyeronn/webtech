let books = require("./books.json");
const express = require("express");
const app = express();

const config = require("../config")
const port = config.expressPort;


books = books.sort((a, b) => a.title.localeCompare(b.title));

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// block to be deleted
// app.use(function (req, res, next) {
//   res.send('Hello client!');
// });
app.get("/", function (req, res) {
  res.send("hello world");
});
app.get("/books", function (req, res) {
  const query = req.query;
  // console.log(query.from + " : "+ query.to)
  // console.log(req)
  res.send(books.slice(query.from, query.to));
});
app.get("/book/:id*", function (req, res) {
  const id = req.params.id;
  //console.log(query + " : "+ query.to)
  // console.log(req)
  let book = books.find((x) => x.isbn13 == id);
  if (!book) {
    res.status(404).send("Not found");
  } else {
    res.send(book);
  }
  //res.send("\nheaders: " + req.headers);
});
app.post("/book", function (req, res) {
  let isbn = req.body.isbn13;
  if (isbn) {
    if (books.find((x) => x.isbn13 == isbn)) {
      res.status(400).send("Oops.. already got it");
    } else {
      books.push(req.body);
      res.send("ADDED : isbn");
    }
  } else {
    res.status(404).send("Not valid request");
  }
});
app.put("/book/:id", function (req, res) {
  let isbn = req.params.id;
  if (isbn) {
    if (!books.find((x) => x.isbn13 == isbn)) {
      res.status(404).send("Nothing to update");
    } else {
     // books.map((x) => (x.isbn13 == isbn) ? req.body : x);
      const index = books.findIndex((el) => el.isbn13 == isbn)
      books[index] = req.body
      res.send("Updated : " + isbn);
    }
  } else {
    res.status(404).send("Not valid request");
  }
});
app.delete("/book/:id", function (req, res) {
  let isbn = req.params.id;
  if (isbn) {
    if (!books.find((x) => x.isbn13 == isbn)) {
      res.status(404).send("Nothing to delete");
    } else {
     // books.map((x) => (x.isbn13 == isbn) ? req.body : x);
      const index = books.findIndex((el) => el.isbn13 == isbn)
      books.splice(index,1)
      //books[index] = req.body
      res.send("Deleted : " + isbn);
    }
  } else {
    res.status(404).send("Not valid request");
  }
});

// TODO: implement me

app.listen(port, () => {});
