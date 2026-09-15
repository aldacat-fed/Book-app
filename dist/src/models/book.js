"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    author: { type: String, required: true, trim: true },
    genres: { type: [String], default: [] },
    image: { type: String, required: true },
    published_year: { type: Number, required: true },
}, {
    // Ger oss createdAt/updatedAt automatiskt (används i admin-tabellen)
    timestamps: true,
    // Gör att vi kan slå upp tillhörande reviews utan att lagra dem i books-dokumentet
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
});
// Virtuellt fält: hämtar alla reviews som pekar på detta book_id (populeras i controllern)
bookSchema.virtual("reviews", {
    ref: "Review",
    localField: "_id",
    foreignField: "book_id",
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
