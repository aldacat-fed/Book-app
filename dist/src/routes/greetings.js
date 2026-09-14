"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const greetingController_1 = require("../controllers/greetingController");
const verifyToken_1 = require("../middleware/verifyToken");
const router = express_1.default.Router();
router.get('/:name', verifyToken_1.verifyToken, greetingController_1.greetingSpecific);
exports.default = router;
