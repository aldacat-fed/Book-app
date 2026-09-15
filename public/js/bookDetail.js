const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const bookId = params.get("id");

const detailContainer = document.getElementById("book-detail");
const reviewListContainer = document.getElementById("review-list");

async function loadBook() {
  if (!bookId) {
    detailContainer.innerHTML = "<p>No book ID provided.</p>";
    return;
  }

  try {
    const response = await fetch(`${API_URL}/books/${bookId}`);
    if (!response.ok) throw new Error("Could not fetch the book");

    const book = await response.json();

    detailContainer.innerHTML = `
      <img src="${book.image}" alt="${book.title}" class="book-detail-image" />
      <h1>${book.title}</h1>
      <p class="book-detail-meta"><strong>Author:</strong> ${book.author}</p>
      <p class="book-detail-meta"><strong>Published year:</strong> ${book.published_year}</p>
      <p class="book-detail-meta"><strong>Genres:</strong> ${book.genres.join(", ")}</p>
      <p class="book-detail-description">${book.description}</p>
    `;

    if (Array.isArray(book.reviews)) {
      renderReviews(book.reviews);
    } else {
      loadReviews();
    }
  } catch (error) {
    detailContainer.innerHTML = "<p>Something went wrong while fetching the book.</p>";
    console.error(error);
  }
}

// Fallback: fetch all reviews and filter out the ones belonging to this book
async function loadReviews() {
  try {
    const response = await fetch(`${API_URL}/reviews`);
    const allReviews = await response.json();
    const bookReviews = allReviews.filter((r) => r.book_id === bookId);
    renderReviews(bookReviews);
  } catch (error) {
    reviewListContainer.innerHTML = "<p>Could not fetch reviews.</p>";
    console.error(error);
  }
}

function renderReviews(reviews) {
  if (!reviews || reviews.length === 0) {
    reviewListContainer.innerHTML = "<p>No reviews yet. Be the first!</p>";
    return;
  }

  reviewListContainer.innerHTML = reviews
    .map((review) => {
      const date = review.created_at || review.createdAt;
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-US")
        : "";

      return `
        <div class="review-card">
          <div class="review-header">
            <strong>${review.name}</strong>
            <span class="review-rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</span>
          </div>
          <p>${review.content}</p>
          <p class="review-date">${formattedDate}</p>
        </div>
      `;
    })
    .join("");
}

async function createReview(event) {
  event.preventDefault();
  const messageEl = document.getElementById("review-message");

  const newReview = {
    name: document.getElementById("review-name").value,
    content: document.getElementById("review-content").value,
    rating: Number(document.getElementById("review-rating").value),
    book_id: bookId,
  };

  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReview),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Could not submit the review");
    }

    messageEl.textContent = "Thanks for your review!";
    document.getElementById("create-review-form").reset();
    loadBook(); // reload to show the new review
  } catch (error) {
    messageEl.textContent = "Error: " + error.message;
    console.error(error);
  }
}

document
  .getElementById("create-review-form")
  .addEventListener("submit", createReview);

loadBook();