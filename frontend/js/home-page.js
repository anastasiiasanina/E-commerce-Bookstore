//elements for showing books
const bookListTemplate = document.querySelector("[books-list-template]");
const bookListContainer = document.querySelector("[data-books-list-container]");

const getLimitedBooksFromBD = async () => {
  try {
    let response = await fetch("http://localhost:8000/api/v1/books");
    let data = await response.json();
    let limitedBooks = [];
    const limitedAmount = 30;
    for (const book of data) {
      if (book.amount <= limitedAmount) {
        limitedBooks.push(book);
      }
    }
    return limitedBooks;
  } catch (e) {
    console.error("Error occured:", e);
  }
};

//showing books
const displayLimitedCard = (bookInfo) => {
  const card = bookListTemplate.content.cloneNode(true).children[0];
  const bookNameHeader = card.querySelector("[data-name-book]");
  const bookPriceHeader = card.querySelector("[data-price-book]");
  const bookAmountHeader = card.querySelector("[data-amount-book]");
  bookNameHeader.textContent = bookInfo.name;
  bookPriceHeader.textContent = bookInfo.price + " UAH";
  bookAmountHeader.textContent = `Only ${bookInfo.amount} books left`;
  bookListContainer.append(card);
};


document.addEventListener("DOMContentLoaded", async () => {
  try {
    const limitedBooks = await getLimitedBooksFromBD();
    for (const book of limitedBooks) {
      displayLimitedCard(book);
    }
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
