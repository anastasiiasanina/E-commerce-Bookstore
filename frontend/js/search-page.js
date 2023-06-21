//div for showing search input
const inputTitle = document.getElementById('input');

//NOT READY YET
const getBooksFromBD = () => {
  
}

document.addEventListener('DOMContentLoaded', () => {
    try {
      const allBooks = getBooksFromBD();
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

    } catch (error) {
      console.error('Error occurred:', error);
    }
})

