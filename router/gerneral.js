const express = require('express');
const { isValid, users } = require("./auth_users.js");
const books = require("./booksdb.js");

const publicUsersRouter = express.Router();

// Register a new user
publicUsersRouter.post("/register", (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "Username or password missing" });
    }
    if (isValid(username) && password) {
        users.push({ username, password });
        return res.status(200).json({ message: "User successfully created" });
    }
    return res.status(400).json({ message: "Invalid username or password" });
});

// Route to get the book list available in the shop
publicUsersRouter.get('/', (req, res) => {
    return res.status(200).json(books);
});

// Route to get book details based on ISBN
publicUsersRouter.get('/isbn/:isbn', (req, res) => {
    const foundBook = Object.values(books).filter(book => book.isbn === req.params.isbn);
    return res.status(404).json(foundBook);

    if (foundBook) {
        return res.status(200).json(foundBook);
    }
    return res.status(404).json({ message: "Book not found" });
});

// Route to get book details based on author
publicUsersRouter.get('/author/:author', (req, res) => {
    const foundBooks = Object.values(books).filter(book => book.author === req.params.author);
    if (foundBooks.length > 0) {
        return res.status(200).json(foundBooks);
    }
    return res.status(404).json({ message: "Books by the author not found" });
});

// Route to get all books based on title
publicUsersRouter.get('/title/:title', (req, res) => {
    const foundBook = Object.values(books).find(book => book.title === req.params.title);
    if (foundBook) {
        return res.status(200).json(foundBook);
    }
    return res.status(404).json({ message: "Book not found" });
});

// Route to get book review based on ISBN
publicUsersRouter.get('/review/:isbn', (req, res) => {
    const foundReview = Object.values(books).find(book => book.isbn === req.params.isbn).reviews;
    if (foundReview) {
        return res.status(200).json(foundReview);
    }
    return res.status(404).json({ message: "Book review not found" });
});

module.exports.general = publicUsersRouter;