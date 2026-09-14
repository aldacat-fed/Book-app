import express from "express";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  deleteReview
} from "../controllers/reviewController";
import { verifyToken } from "../middleware/verifyToken";

const router = express.Router();

router.get("/", getReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.put("/:id", verifyToken, updateReview);
router.delete("/:id", verifyToken, deleteReview);

export default router;
