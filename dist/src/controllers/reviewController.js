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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviewById = exports.getReviews = void 0;
const review_1 = require("../models/review");
const getReviews = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield review_1.Review.find();
        res.json(reviews);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Could not fetch reviews"
        });
    }
});
exports.getReviews = getReviews;
const getReviewById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.Review.findById(req.params.id);
        if (!review) {
            res.status(404).json({
                message: "Review not found"
            });
            return;
        }
        res.json(review);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Could not fetch review"
        });
    }
});
exports.getReviewById = getReviewById;
const createReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, content, rating, book_id } = req.body;
        if (!name || !content || !rating || !book_id) {
            res.status(400).json({
                message: "name, content, rating and book_id are required"
            });
            return;
        }
        const review = yield review_1.Review.create({
            name,
            content,
            rating,
            book_id
        });
        res.status(201).json(review);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Could not create review"
        });
    }
});
exports.createReview = createReview;
const updateReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.Review.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!review) {
            res.status(404).json({
                message: "Review not found"
            });
            return;
        }
        res.json(review);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Could not update review"
        });
    }
});
exports.updateReview = updateReview;
const deleteReview = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield review_1.Review.findByIdAndDelete(req.params.id);
        if (!review) {
            res.status(404).json({
                message: "Review not found"
            });
            return;
        }
        res.json({
            message: "Review deleted successfully"
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Could not delete review"
        });
    }
});
exports.deleteReview = deleteReview;
