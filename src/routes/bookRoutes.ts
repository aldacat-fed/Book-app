import { Router } from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/bookController";
 
// OBS: Den som bygger ansvarsområde 1 (users/auth) skapar auth-middlewaren.
// Byt ut sökvägen/namnet nedan mot det som faktiskt används i ert API,
// t.ex. "../middleware/verifyToken" eller liknande.
import { verifyToken } from "../middleware/verifyToken";
 
const router = Router();
 
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", verifyToken, createBook);
router.patch("/:id", verifyToken, updateBook);
router.delete("/:id", verifyToken, deleteBook);

export default router;