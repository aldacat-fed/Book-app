import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";

import { verifyToken } from "../middleware/verifyToken";
 
const router = Router();
 
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken, createBook);
router.patch("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;