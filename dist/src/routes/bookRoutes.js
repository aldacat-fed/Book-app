"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("../controllers/bookController");
// OBS: Den som bygger ansvarsområde 1 (users/auth) skapar auth-middlewaren.
// Byt ut sökvägen/namnet nedan mot det som faktiskt används i ert API,
// t.ex. "../middleware/verifyToken" eller liknande.
const verifyToken_1 = require("../middleware/verifyToken");
const router = (0, express_1.Router)();
router.get("/", bookController_1.getAllBooks);
router.get("/:id", bookController_1.getBookById);
router.post("/", verifyToken_1.verifyToken, bookController_1.createBook);
router.patch("/:id", verifyToken_1.verifyToken, bookController_1.updateBook);
router.delete("/:id", verifyToken_1.verifyToken, bookController_1.deleteBook);
exports.default = router;
