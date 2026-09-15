# Diary – Group Project: Book API

## Ansvarsområde 1 - Linn

## Area of Responsibility 2 – Alda 
### Week 1 – Getting started
Started by setting up the books collection in MongoDB via Mongoose according to the assignment requirements (title, description, author, genres, image, published_year). Added timestamps: true early on to automatically get createdAt/updatedAt, which later turned out to be necessary since the admin table needs to show "created" per book.

Built the CRUD controller (bookController.ts) and connected it to the routes (bookRoutes.ts): GET all books, GET a single book, POST, PATCH and DELETE – the latter three protected with verifyToken.

Ran into several configuration issues in the shared base structure early on:
- app.use("/api/books", bookRoutes) was placed in api/index.ts before app had even been created – moved it to the right place.
- The MongoDB connection (mongoose.connect) was completely commented out, which was the reason nothing was being saved to the database regardless of how correct the API code was. Enabled it.

### Week 1-2- Testning and bug fixes
Wrote test scripts to quickly verify that all five endpoints worked without having to test manually every time. Through testing I found and fixed two bugs:
- GET /api/books/:id was silently failing (Could not fetch book) because .populate("reviews") tried to join with the Review model before area of responsibility 3 had built it yet. Solved this with a check (mongoose.modelNames().includes("Review")) that only populates if the model is actually registered.
- Temporarily removed verifyToken from POST/PATCH/DELETE to be able to test my own CRUD logic in isolation before login/register was finished in area of responsibility 1. Restored the token protection as soon as it was possible to test with a real login.

### Week 2 - Client pages
Built the three client pages required for area of responsibility 2:
- Book list (book-list.html + js/books.js): fetches all books and displays them as clickable cards with image, title, author, published year and genres. Each card links to book.html?id=....
- Admin table (section in protected.html + js/adminBooks.js): lists all books (title, author, genres, created, published_year) and has a form for creating new books with an Authorization header.
- Specific book page (book.html + js/bookDetail.js): shows a large image, author, published year, title, description and genres, and fetches and displays reviews tied to the book (via the populated reviews field or a fallback call to /api/reviews) along with a form for submitting new reviews.
Added five example books via the admin form (not via scripts or directly in Compass) so the database and book list have real content to show at the presentation.

### Week 2 - Polish
- Rewrote error messages and UI text to English throughout, for consistency with the rest of the codebase.
- Fixed confirmation/error messages in the admin panel and the "Hello admin, welcome!" greeting so they disappear automatically after a few seconds instead of staying on screen permanently.
- Designed and built a cohesive stylesheet for the whole client: sticky navigation, cards with layered shadows and hover lift, a two-column book detail page, a styled admin table with a sticky header row, and a fully responsive layout down to mobile.

## Ansvarsområde 3 - Mohammed

## Collaboration within the group
Worked in my own branch and continuously checked interfaces against the other areas of responsibility. 
Merging pull requests went smoothly with no conflicts. The group has stayed on track with the plan throughout and is happy with the result.
