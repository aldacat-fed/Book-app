const BOOKS_API_URL = "http://localhost:3000/api/books";

// OBS: Anta att token sparas i localStorage vid inloggning, av ansvarsområde 1
// (t.ex. localStorage.setItem("token", data.token) i login-koden).
// Justera nyckeln nedan om ni sparar token på ett annat sätt.
function getToken() {
  return localStorage.getItem("token");
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
        ? new Date(book.createdAt).toLocaleDateString("sv-SE")
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
    console.error("Kunde inte hämta böcker för admin-tabellen", error);
  }
}

async function createBook(event) {
  event.preventDefault();
  const messageEl = document.getElementById("admin-books-message");

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
      throw new Error(errorData.message || "Kunde inte skapa boken");
    }

    messageEl.textContent = "Boken skapades!";
    document.getElementById("create-book-form").reset();
    loadAdminBooks(); // uppdatera tabellen
  } catch (error) {
    messageEl.textContent = "Fel: " + error.message;
    console.error(error);
  }
}

document
  .getElementById("create-book-form")
  .addEventListener("submit", createBook);

loadAdminBooks();