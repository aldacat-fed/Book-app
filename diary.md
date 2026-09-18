# Diary – Group Project: Book API

## Ansvarsområde 1 - Linn
### Week 1 – Getting started
Started in VS Code: created the Model, Routes, and Controller for the User entity, along with token handling. Model: defined with types and descriptions. Routes: API endpoints protected by a JWT stored in an httpOnly cookie, verified before the request proceeds to the controller. Controller: implemented full CRUD operations for users.

Replaced the hardcoded login with a database-backed user. In the authController, added a register function that uses User.create to store new users in MongoDB, and User.findOne to retrieve a specific user for login. During login, the provided password is compared against the stored hashed password. The API never returns the password field in responses. As a result, users can register and log in securely. On successful login, a JSON Web Token (JWT) is signed containing the user's id, username, and is_admin status, with a validity period of 7 days.

Everything was tested via Insomnia and verified directly in MongoDB.

Everything was tested via Insomnia and checked in MongoDB. Started building client.

Ran in some issues with route-imports.

### Week 1-2- Testning and Client page
Continued building client and connected to server. Created two forms for login and registration. The forms toggle dynamically using JavaScript, with validation messages shown when a field is filled in incorrectly. Reviewed all code from the previous week and fixed several minor bugs. Continued testing with Insomnia.

Ran in some issues with error-messages not showing in client. Had to restructure html.

### Week 2 - Client page and polish
Added a personalized greeting shown when a user logs in. The username is dynamic and updates based on the logged-in user, retrieved from the JWT via req.user. On logout, the accessToken cookie is cleared and the user is redirected to the login page. Also refined the layout and features, including the form toggle functionality. Small layout fixes.

Ran in some issues with greeting specific user. Had to save username as req.user in middleware/verifyToken before next() is called.


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

### Week 1 – Getting started with Reviews

Started by creating the Review model in Mongoose according to the assignment requirements: name, content, rating, created_at, review_id and book_id. Added validation for required fields and restricted the rating to values between 1 and 5. Used book_id to connect each review to the correct book.

Built the Review controller with the required CRUD operations: GET all reviews, GET a single review, POST, PATCH and DELETE. Added basic validation and error handling, including appropriate 400, 404 and 500 responses.

Created reviewRoutes.ts and connected each endpoint to the corresponding controller function. PATCH and DELETE were protected with verifyToken so that only authenticated users can modify or remove reviews.

Week 1-2 – API integration and testing

Connected the Review router to the Express application with /api/reviews.

Tested the Review API step by step using the local server and PowerShell. Started with GET requests, then created test reviews with POST and verified that they were stored in MongoDB and could be retrieved again.

Tested authentication for PATCH and DELETE. Requests without a valid token returned 401 Unauthorized. After logging in and receiving a JWT through the existing authentication system, PATCH and DELETE worked as expected.

Ran into a few smaller issues during development, including a missing JWT_SECRET in the local .env file and an incorrect PUT route, which was changed to PATCH according to the assignment.

### Week 2 – Integration with the book page

Integrated the Review functionality with the existing specific book page. Tested the complete flow from the client: selecting a book, filling in the review form and submitting a review.

Verified that the review data was sent correctly from the client to /api/reviews, saved in MongoDB with the correct book_id, and then displayed again on the corresponding book page.

Worked with the existing Book/Review relationship using book_id and the populated reviews field, and verified that reviews belonging to one book were displayed on that book's page.

Tested the full browser flow by creating reviews directly through the form and checking that the new reviews appeared immediately after submission.

### Collaboration within the group

Worked mainly on the Reviews functionality while keeping the implementation compatible with the Book and Authentication areas developed by the other group members.

Used separate Git branches for my work and carefully selected which files to include in commits so that changes from other group members were not included accidentally. Merged the Review work into main and verified the final integrated version with the group.
## Collaboration within the group
Worked in my own branch and continuously checked interfaces against the other areas of responsibility. 
Merging pull requests went smoothly with no conflicts. The group has stayed on track with the plan throughout and is happy with the result.

