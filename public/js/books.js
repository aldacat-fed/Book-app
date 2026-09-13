const API_URL = "http://localhost:3000/api/books";

async function loadBooks() {
  const listContainer = document.getElementById("book-list");
  listContainer.innerHTML = "Laddar böcker...";

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Kunde inte hämta böcker");

    const books = await response.json();
    listContainer.innerHTML = "";

    if (books.length === 0) {
      listContainer.innerHTML = "<p>Inga böcker hittades.</p>";
      return;
    }

    books.forEach((book) => {
      const card = document.createElement("a");
      card.href = `book.html?id=${book._id}`; // Länk till specifik boksida (byggs av ansvarsområde 3)
      card.className = "book-card";

      card.innerHTML = `
        <img src="${book.image}" alt="${book.title}" width="120" />
        <h3>${book.title}</h3>
        <p><strong>Författare:</strong> ${book.author}</p>
        <p><strong>År:</strong> ${book.published_year}</p>
        <p><strong>Genres:</strong> ${book.genres.join(", ")}</p>
      `;

      listContainer.appendChild(card);
    });
  } catch (error) {
    listContainer.innerHTML = "<p>Något gick fel vid hämtning av böcker.</p>";
    console.error(error);
  }
}

loadBooks();