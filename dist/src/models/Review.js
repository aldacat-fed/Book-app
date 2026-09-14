"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    review_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        default: () => new mongoose_1.Types.ObjectId()
    },
    book_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    }
});
exports.Review = (0, mongoose_1.model)("Review", reviewSchema);
