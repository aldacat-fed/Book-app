import 'dotenv/config'
import express from 'express';
import cors from 'cors'
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';

const app = express();

// in the .env file can the following variables be included
// JWT_SECRET = 'secret'
// NODE_ENV = 'development' # development | production
// CLIENT_URL = 'http://localhost:4000'


// Middleware
// Reads a request body sent as JSON text and turns it into a real JavaScript
// object, which Express hands us as req.body.
app.use(express.json());

// Reads the browser's Cookie header and splits it into req.cookies, so
// verifyToken can reach the token as req.cookies.accessToken.
app.use(cookieParser());

// CORS only concerns requests from OTHER origins. Our own client lives in
// public/ and is served from the same origin as this API, so the browser never
// applies these rules to it.
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

// Serve the static client (the HTML/CSS/JS in public/).
// process.cwd() is the project root, path.join() builds the path to public/,
// and express.static() turns every file in it into a URL
// (public/index.html -> GET /, public/js/login.js -> GET /js/login.js).
// On Vercel the platform serves public/ by itself, so this is mostly a local convenience.
app.use(express.static(path.join(process.cwd(), 'public')));


// Routes
import authRouter from '../src/routes/auth'
import greetingRouter from '../src/routes/greetings'
import userRouter from '../src/routes/users'
import bookRoutes from '../src/routes/bookRoutes'
import reviewRouter from '../src/routes/reviewRoutes'

app.use('/api/auth', authRouter)
app.use('/api/greetings', greetingRouter)
app.use('/api/users', userRouter)
app.use('/api/books', bookRoutes)
app.use('/api/reviews', reviewRouter)


// Connect To DB
mongoose.connect(process.env.MONGODB_URL || "")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));


// Start the server locally only. On Vercel the platform runs the exported app itself.
if (!process.env.VERCEL) {
  const PORT = 3000
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
}

export default app