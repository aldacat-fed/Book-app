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
exports.logout = exports.register = exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
        res.status(400).json({ message: 'username and password are required' });
        return;
    }
    const hashedPassword = "$2b$10$WoiGUJIU1IB5VarJOe468eae0wHxD53MI9PJta2ohnBam2R72Kc2S";
    const isLoggedIn = yield bcrypt_1.default.compare(password, hashedPassword);
    if (username === 'admin' && password === '123') {
        const accessToken = jsonwebtoken_1.default.sign({ username }, process.env.JWT_SECRET || "", { expiresIn: '7d' });
        console.log(accessToken);
        res.cookie('accessToken', accessToken, {
            // Prevents client-side JavaScript from accessing the cookie (e.g. document.cookie).
            // This protects against XSS attacks where malicious scripts try to steal the token.
            httpOnly: true, // JS has no access to the cookie
            // When true, the cookie is only sent over HTTPS connections.
            // We enable this in production (where we use HTTPS) but disable it locally (HTTP).
            secure: false,
            // Controls when the cookie is sent with cross-site requests.
            // 'none': Cookie is sent on all cross-origin requests (required when frontend and API are on different domains in production). Requires secure: true.
            // 'lax': Cookie is sent on same-site requests and top-level navigations (safe default for local development).
            sameSite: 'lax',
            // How long the cookie lives in the browser, in milliseconds.
            // After this time the browser automatically deletes the cookie and the user must log in again.
            maxAge: 1000 * 60 * 60 * 24 * 7 // Lives on for 7 days
        });
        res.json({ message: 'You are logged in', isLoggedIn: isLoggedIn });
        return;
    }
    else {
        res.status(401).json({ message: 'username/password are wrong' });
        return;
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    if (username === undefined || password === undefined) {
        res.status(400).json({ message: 'username and password are required' });
        return;
    }
    try {
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        // The hashedPassword is the value that should be saved in the DB, not the plain password. For security reasons
        res.json({ message: "You are registered", username: username, password: password, hashedPassword: hashedPassword });
    }
    catch (e) {
        console.log(e);
    }
});
exports.register = register;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie('accessToken');
    res.json({ message: "You are logged out" });
});
exports.logout = logout;
