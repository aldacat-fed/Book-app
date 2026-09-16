const BOOKS_API_URL = "http://localhost:3000/api/books";

function getToken() {
  return localStorage.getItem("token");
}

let messageTimeout;

// Shows a message in #admin-books-message and clears it again after a while
function showMessage(text, durationMs = 3000) {
  const messageEl = document.getElementById("admin-books-message");
  messageEl.textContent = text;

  clearTimeout(messageTimeout); // in case a new message arrives before the previous one disappeared
  messageTimeout = setTimeout(() => {
    messageEl.textContent = "";
  }, durationMs);
}

async function loadAdminBooks() {
  const tbody = document.getElementById("admin-books-tbody");
  tbody.innerHTML = "";

  try {
    const response = await fetch(BOOKS_API_URL);
    const books = await response.json();

    books.forEach((book) => {
      const row = document.createElement("tr");
      const createdDate = book.createdAt
        ? new Date(book.createdAt).toLocaleDateString("en-US")
        : "-";

      row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.genres.join(", ")}</td>
        <td>${createdDate}</td>
        <td>${book.published_year}</td>
      `;

      tbody.appendChild(row);
    });
  } catch (error) {
    console.error("Could not fetch books for the admin table", error);
  }
}

async function createBook(event) {
  event.preventDefault();

  const newBook = {
    title: document.getElementById("book-title").value,
    description: document.getElementById("book-description").value,
    author: document.getElementById("book-author").value,
    genres: document
      .getElementById("book-genres")
      .value.split(",")
      .map((g) => g.trim())
      .filter(Boolean),
    image: document.getElementById("book-image").value,
    published_year: Number(document.getElementById("book-year").value),
  };

  try {
    const response = await fetch(BOOKS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Could not create the book");
    }

    showMessage("Book created!");
    document.getElementById("create-book-form").reset();
    loadAdminBooks(); // refresh the table
  } catch (error) {
    showMessage("Error: " + error.message, 4000);
    console.error(error);
  }
}

document
  .getElementById("create-book-form")
  .addEventListener("submit", createBook);

loadAdminBooks();


(function autoHideGreeting() {
  const greetingEl = document.getElementById("greeting");
  if (!greetingEl) return;

  let hideTimeout;

  function scheduleHide() {
    if (greetingEl.textContent.trim() === "") return;
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      greetingEl.style.transition = "opacity 0.4s ease";
      greetingEl.style.opacity = "0";
      setTimeout(() => {
        greetingEl.style.display = "none";
      }, 400);
    }, 3000);
  }

  // If the text is already there when the page loads
  scheduleHide();

  // If protected.js sets the text a bit later (async)
  const observer = new MutationObserver(scheduleHide);
  observer.observe(greetingEl, { childList: true, characterData: true, subtree: true });
})();