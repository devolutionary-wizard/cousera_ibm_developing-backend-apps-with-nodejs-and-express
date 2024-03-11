const express = require('express');
const books = require("./booksdb.js");

const regdUsersRouter = express.Router();

let users = [];

const isValid = (username) => {
    return username.length >= 3;
}

// Login as a Registered user
regdUsersRouter.post("/login", (req, res) => {
    const { userName, password } = req.body;
    const user = users.find(user => user.userName === userName && user.password === password);
    if (user) {
        return res.status(200).json({ message: "You have entered as user" });
    } else {
        return res.status(404).json({ message: "Invalid username or password" });
    }
});

// Add or update a book review
regdUsersRouter.put("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const { name, message } = req.body;
    const book = books[isbn];
    if (book) {
        book.reviews = { name, message };
        return res.status(200).json(book.reviews);
    } else {
        return res.status(404).json({ message: 'Book not found' });
    }
});

// Delete a book review
regdUsersRouter.delete("/auth/review/:isbn", (req, res) => {
    const { isbn } = req.params;
    const book = books[isbn];
    if (book) {
        book.reviews = { name: "", message: "" };
        return res.status(200).json(book.reviews);
    } else {
        return res.status(404).json({ message: 'Book not found' });
    }
});

module.exports = {
    authenticated: regdUsersRouter,
    isValid: isValid,
    users: users
};
