import {Request, Response} from 'express';
import mongoose from 'mongoose';
import { Book } from '../models/book';

// GET /api/books — fetch all books
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch books", error });
  }
};

// GET /api/books/:id — fetch a book with its reviews
export const getBookById = async (req: Request, res: Response) => {
  try {
    const reviewModelExists = mongoose.modelNames().includes("Review");

    let bookQuery = Book.findById(req.params.id);
    if (reviewModelExists) {
      bookQuery = bookQuery.populate("reviews");
    }

    const book = await bookQuery;
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch book", error });
  }
};

// POST /api/books — create a new book (requires token)
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, author, genres, image, published_year } = req.body;
    if (!title || !description || !author || !image || !published_year) {
      return res.status(400).json({ message: "Missing fields in request" });
    }
    const newBook = await Book.create({
      title,
      description,
      author,
      genres,
      image,
      published_year,
    });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: "Could not create book", error });
  }
};

// PATCH /api/books/:id — update an existing book (requires token)
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Could not update book", error });
  }
};

// DELETE /api/books/:id — delete an existing book (requires token)
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json({ message: "Book deleted", book: deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Could not delete book", error });
  }
};