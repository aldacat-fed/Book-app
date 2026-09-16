"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const book_1 = require("../models/book");
// GET /api/books — fetch all books
const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield book_1.Book.find();
        res.status(200).json(books);
    }
    catch (error) {
        res.status(500).json({ message: "Could not fetch books", error });
    }
});
exports.getAllBooks = getAllBooks;
// GET /api/books/:id — fetch a book with its reviews
const getBookById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewModelExists = mongoose_1.default.modelNames().includes("Review");
        let bookQuery = book_1.Book.findById(req.params.id);
        if (reviewModelExists) {
            bookQuery = bookQuery.populate("reviews");
        }
        const book = yield bookQuery;
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    }
    catch (error) {
        res.status(500).json({ message: "Could not fetch book", error });
    }
});
exports.getBookById = getBookById;
// POST /api/books — create a new book (requires token)
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, author, genres, image, published_year } = req.body;
        if (!title || !description || !author || !image || !published_year) {
            return res.status(400).json({ message: "Missing fields in request" });
        }
        const newBook = yield book_1.Book.create({
            title,
            description,
            author,
            genres,
            image,
            published_year,
        });
        res.status(201).json(newBook);
    }
    catch (error) {
        res.status(500).json({ message: "Could not create book", error });
    }
});
exports.createBook = createBook;
// PATCH /api/books/:id — update an existing book (requires token)
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updatedBook = yield book_1.Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(updatedBook);
    }
    catch (error) {
        res.status(500).json({ message: "Could not update book", error });
    }
});
exports.updateBook = updateBook;
// DELETE /api/books/:id — delete an existing book (requires token)
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedBook = yield book_1.Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json({ message: "Book deleted", book: deletedBook });
    }
    catch (error) {
        res.status(500).json({ message: "Could not delete book", error });
    }
});
exports.deleteBook = deleteBook;
