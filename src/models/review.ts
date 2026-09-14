import { Schema, model, Types } from "mongoose";

export interface IReview {
  name: string;
  content: string;
  rating: number;
  created_at: Date;
  review_id: Types.ObjectId;
  book_id: Types.ObjectId;
}

const reviewSchema = new Schema<IReview>({
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
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },

  book_id: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true
  }
});

export const Review = model<IReview>("Review", reviewSchema);