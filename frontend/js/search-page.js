//div for showing search input
const inputTitle = document.getElementById('input');

//searching books
const bookListTemplate = document.querySelector('[books-list-template]');
const bookListContainer = document.querySelector('[data-books-list-container]');
let bookResults = [];
let bd = [
  { name: 'It Ends With Us', author: 'Colleen Hoover', price: '450' }, 
  { name: 'The Picture of Dorian Gray', author: 'Oscar Wilde', price: '200' }, 
  { name: 'Goblet of Fire', author: 'J. K. Rowling', price: '800' },
  { name: 'Midnight Sun', author: 'Stephenie Meyer', price: '500'}
];

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('query'); 
    inputTitle.textContent = searchQuery;

    const value = searchQuery.toLowerCase();
    for (const book of bd) {
      const changedName = book.name.toLowerCase();
      if (changedName.includes(value)) {
        bookResults.push(book)
      }
    }

    bookResults.map((bookName) => {
      const card = bookListTemplate.content.cloneNode(true).children[0];
      const bookNameHeader = card.querySelector("[data-name-book]");
      const bookAuthorHeader = card.querySelector("[data-author-book]");
      const bookPriceHeader = card.querySelector("[data-price-book]");
      bookNameHeader.textContent = bookName.name;
      bookAuthorHeader.textContent = bookName.author;
      bookPriceHeader.textContent = bookName.price;
      bookListContainer.append(card);
    });
})

