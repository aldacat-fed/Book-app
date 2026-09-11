import {Request, Response} from 'express';
import { Book } from '../models/book';

// GET /api/books — hämta alla böcker
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch books", error });
  }
};

// GET /api/books/:id — hämta en bok med tillhörande reviews
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch book", error });
  }
};

// POST /api/books — skapa ny bok (kräver token)
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, description, author, genres, image, published_year } = req.body;
 
    if (!title || !description || !author || !image || !published_year) {
      return res.status(400).json({ message: "Fält saknas i förfrågan" });
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
    res.status(500).json({ message: "Kunde inte skapa boken", error });
  }
};

// PATCH /api/books/:id — uppdatera befintlig bok (kräver token)
export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
 
    if (!updatedBook) {
      return res.status(404).json({ message: "Boken hittades inte" });
    }
 
    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Kunde inte uppdatera boken", error });
  }
};
 
// DELETE /api/books/:id — radera befintlig bok (kräver token)
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
 
    if (!deletedBook) {
      return res.status(404).json({ message: "Boken hittades inte" });
    }
 
    res.status(200).json({ message: "Boken raderades", book: deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Kunde inte radera boken", error });
  }
};