"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.get('/', verifyToken_1.verifyToken, userController_1.fetchAllUsers);
router.get('/:id', verifyToken_1.verifyToken, userController_1.fetchUser);
router.patch('/:id', verifyToken_1.verifyToken, userController_1.updateUser);
router.delete('/:id', verifyToken_1.verifyToken, userController_1.deleteUser);
exports.default = router;
