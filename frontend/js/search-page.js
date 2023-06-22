//div for showing search input
const inputTitle = document.getElementById("input");

const getBooksFromBD = async () => {
  try {
    let response = await fetch("http://localhost:8000/api/v1/books");
    let data = await response.json();
    let arrayOfBooks = [];
    for (const book of data) {
      arrayOfBooks.push(book);
    }
    return arrayOfBooks;
  } catch (e) {
    console.error("Error occured:", e);
  }
};

const displayFoundCard = (bookInfo) => {
  const bookListTemplate = document.querySelector("[books-list-template]");
  const bookListContainer = document.querySelector("[data-books-list-container]");
  const card = bookListTemplate.content.cloneNode(true).children[0];
  const bookNameHeader = card.querySelector("[data-name-book]");
  const bookAuthorHeader = card.querySelector("[data-author-book]");
  const bookPriceHeader = card.querySelector("[data-price-book]");
  bookNameHeader.textContent = bookInfo.name;
  bookAuthorHeader.textContent = bookInfo.author;
  bookPriceHeader.textContent = bookInfo.price + " UAH";
  bookListContainer.append(card);
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const allBooks = await getBooksFromBD();
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get("query");
    inputTitle.textContent = searchQuery;
    let results = [];

    const value = searchQuery.toLowerCase();
    for (const book of allBooks) {
      const changedName = book.name.toLowerCase();
      if (changedName.includes(value)) {
        results.push(book);
      }
    }
    
    for (const res of results) {
      displayFoundCard(res);
    }    
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
