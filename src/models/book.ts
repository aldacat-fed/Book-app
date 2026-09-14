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
    // Ger oss createdAt/updatedAt automatiskt (används i admin-tabellen)
    timestamps: true,
    // Gör att vi kan slå upp tillhörande reviews utan att lagra dem i books-dokumentet
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtuellt fält: hämtar alla reviews som pekar på detta book_id (populeras i controllern)
bookSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "book_id",
});

export const Book = model<IBook>("Book", bookSchema);