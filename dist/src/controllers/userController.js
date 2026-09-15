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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.fetchUser = exports.fetchAllUsers = void 0;
const users_1 = __importDefault(require("../models/users"));
const fetchAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const search = req.query.search;
    const sort = req.query.sort;
    try {
        function escapeRegex(str) {
            return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); //hantera specialtecken så ej oväntade matchningar
        }
        let filter = {};
        if (search) {
            filter = {
                username: { $regex: escapeRegex(search), $options: 'i' },
            };
        }
        let sortOrder = {};
        if (sort &&
            (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')) {
            sortOrder = { username: sort };
        }
        const users = yield users_1.default.find(filter)
            .sort(sortOrder)
            .select('-password'); //vrf .select('-password')
        res.json(users);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.fetchAllUsers = fetchAllUsers;
const fetchUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const user = yield users_1.default.findById(id).select('-password');
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json(user);
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.fetchUser = fetchUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { username, is_admin } = req.body;
    if (username === undefined && is_admin === undefined) {
        res.status(400).json({ error: 'Username or is_admin is required' });
        return;
    }
    try {
        const updatedFields = {};
        if (username !== undefined)
            updatedFields.username = username;
        if (is_admin !== undefined)
            updatedFields.is_admin = is_admin;
        const result = yield users_1.default.updateOne({ _id: id }, { $set: updatedFields });
        if (result.matchedCount === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User updated' });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield users_1.default.deleteOne({ _id: id });
        if (result.deletedCount === 0) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        res.json({ message: 'User deleted', result: result });
    }
    catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        res.status(500).json({ error: message });
    }
});
exports.deleteUser = deleteUser;
