// Import Express
const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory books array
let books = [
  { id: 1, title: "Book One", author: "Author One" },
  { id: 2, title: "Book Two", author: "Author Two" }
];

// GET /books - get all books
app.get("/books", (req, res) => {
  res.json(books);
});

// POST /books - add a new book
app.post("/books", (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - update a book
app.put("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  const book = books.find(b => b.id === bookId);

  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;

  res.json(book);
});

// DELETE /books/:id - delete a book
app.delete("/books/:id", (req, res) => {
  const bookId = parseInt(req.params.id);
  books = books.filter(b => b.id !== bookId);
  res.json({ message: "Book deleted" });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
