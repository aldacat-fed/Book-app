const API_URL = "http://localhost:3000/api/books";

async function loadBooks() {
  const listContainer = document.getElementById("book-list");
  listContainer.innerHTML = "Loading books...";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Could not fetch books");

    const books = await response.json();
    listContainer.innerHTML = "";

    if (books.length === 0) {
      listContainer.innerHTML = "<p>No books found.</p>";
      return;
    }

    books.forEach((book) => {
      const card = document.createElement("a");
      card.href = `book.html?id=${book._id}`;
      card.className = "book-card";

      card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" width="120" />
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Year:</strong> ${book.published_year}</p>
        <p><strong>Genres:</strong> ${book.genres.join(", ")}</p>
      `;

      listContainer.appendChild(card);
    });
  } catch (error) {
    listContainer.innerHTML = "<p>Something went wrong while fetching books.</p>";
    console.error(error);
  }
}

loadBooks();