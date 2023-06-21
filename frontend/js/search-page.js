//div for showing search input
const inputTitle = document.getElementById("input");

//searching books
const bookListTemplate = document.querySelector("[books-list-template]");
const bookListContainer = document.querySelector("[data-books-list-container]");

//NOT READY YET
const getBooksFromBD = () => {};

document.addEventListener("DOMContentLoaded", () => {
  try {
    const allBooks = getBooksFromBD();
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("query");
    inputTitle.textContent = searchQuery;

    const value = searchQuery.toLowerCase();
    for (const book of bd) {
      const changedName = book.name.toLowerCase();
      if (changedName.includes(value)) {
        bookResults.push(book);
      }
    }

    const createBookCard = (book) => {
      const card = bookListTemplate.content.cloneNode(true).children[0];
      populateBookData(card, book);
      return card;
    };

    const populateBookData = (card, book) => {
      const bookNameHeader = card.querySelector("[data-name-book]");
      const bookAuthorHeader = card.querySelector("[data-author-book]");
      const bookPriceHeader = card.querySelector("[data-price-book]");
      bookNameHeader.textContent = book.name;
      bookAuthorHeader.textContent = book.author;
      bookPriceHeader.textContent = book.price;
    };

    const displayBookCard = (card) => {
      bookListContainer.append(card);
    };

    bookResults.map((book) => {
      const card = createBookCard(book);
      displayBookCard(card);
    });
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
