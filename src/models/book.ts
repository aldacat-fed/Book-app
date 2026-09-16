import { Schema, model, Types } from "mongoose";

export interface IBook {
  title: string;
  description: string;
  author: string;
  genres: string[];
  image: string;
  published_year: number;
}

const bookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    genres: { type: [String], default: [] },
    image: { type: String, required: true },
    published_year: { type: Number, required: true },
  },
  {
    // Gives us createdAt/updatedAt automatically (used in the admin table)
    timestamps: true,
    // Lets us look up related reviews without storing them in the book document
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field: fetches all reviews pointing to this book's id (populated in the controller)
bookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book_id",
});

export const Book = model<IBook>("Book", bookSchema);