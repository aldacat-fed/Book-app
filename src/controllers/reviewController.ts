import { Request, Response } from "express";
import { Review } from "../models/review";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find();

    res.json(reviews);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not fetch reviews"
    });
  }
};

export const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      res.status(404).json({
        message: "Review not found"
      });
      return;
    }

    res.json(review);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not fetch review"
    });
  }
};


export const createReview = async (req: Request, res: Response) => {
  try {
    const { name, content, rating, book_id } = req.body;

    if (!name || !content || !rating || !book_id) {
      res.status(400).json({
        message: "name, content, rating and book_id are required"
      });
      return;
    }

    const review = await Review.create({
      name,
      content,
      rating,
      book_id
    });

    res.status(201).json(review);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not create review"
    });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!review) {
      res.status(404).json({
        message: "Review not found"
      });
      return;
    }

    res.json(review);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not update review"
    });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      res.status(404).json({
        message: "Review not found"
      });
      return;
    }

    res.json({
      message: "Review deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not delete review"
    });
  }
};