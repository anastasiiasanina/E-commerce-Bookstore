"use strict";

//elements of price input
const priceInput = document.querySelectorAll(".price-input input");

//button 'find books'
const filterBtn = document.querySelector(".find-btn");

//titles of the menu
const titlesOfGenres = document.getElementsByClassName("title");
const titlesOfAuthors = document.getElementsByClassName("author");

//elements for showing books
const bookListTemplate = document.querySelector("[books-list-template]");
const bookListContainer = document.querySelector("[data-books-list-container]");
const mainTitle = document.querySelector("[changing-title]");

//chosen filter options
const filters = {
  genres: [],
  authors: [],
  priceRange: [],
};

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

//event handler for clicks on menu
const handleClick = (e, arr) => {
  const selectedText = e.target.textContent;
  if (e.target.classList.contains("active")) {
    e.target.classList.remove("active");
    let index = arr.indexOf(selectedText);
    arr.splice(index, 1);
  } else {
    e.target.classList.add("active");
    arr.push(selectedText);
  }
};

//getting filter values
const getFilters = () => {
  let minPrice = priceInput[0].value;
  let maxPrice = priceInput[1].value;
  filters.priceRange = [minPrice, maxPrice];
  mainTitle.textContent = "Found Books";
  return filters;
};

//filtering books
const filterBooks = (e, arrayOfBooks) => {
  getFilters();
  const { genres, authors, priceRange } = filters;
  const filteredBooks = arrayOfBooks.filter((book) => {
    const matchGenres = genres.length === 0 || genres.includes(book.genre);
    const matchAuthors = authors.length === 0 || authors.includes(book.author);
    const matchPriceRange = book.price >= priceRange[0] && book.price <= priceRange[1];

    return matchGenres && matchAuthors && matchPriceRange;
  });

  while (bookListContainer.firstChild) {
    bookListContainer.removeChild(bookListContainer.firstChild);
  }

  for (const book of filteredBooks) {
    displayCard(book);
  }
};

//showing books
const displayCard = (bookInfo) => {
  const card = bookListTemplate.content.cloneNode(true).children[0];
  const bookNameHeader = card.querySelector("[data-name-book]");
  const bookAuthorHeader = card.querySelector("[data-author-book]");
  const bookPriceHeader = card.querySelector("[data-price-book]");
  bookNameHeader.textContent = bookInfo.name;
  bookAuthorHeader.textContent = bookInfo.author;
  bookPriceHeader.textContent = bookInfo.price + " UAH";
  bookListContainer.append(card);
};

//displaying titles on menu
const displayCategories = (arrayOfBooks) => {
  const genresContainer = document.querySelector(".categories-text");
  const authorsContainer = document.querySelector(".authors-list");
  let authors = [];
  let genres = [];

  for (const book of arrayOfBooks) {
    if (!authors.includes(book.author)) {
      authors.push(book.author);
      const author = document.createElement("li");
      author.classList.add("author");
      author.textContent = book.author;
      authorsContainer.appendChild(author);
    }

    if (!genres.includes(book.genre)) {
      genres.push(book.genre);
      const genre = document.createElement("div");
      genre.classList.add("title");
      genre.textContent = book.genre;
      genresContainer.appendChild(genre);
    }
  }
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const allBooks = await getBooksFromBD();
    displayCategories(allBooks);

    for (const book of allBooks) {
      displayCard(book);
    }

    //event handlers for clicks on categories
    for (const title of titlesOfGenres) {
      title.addEventListener("click", (e) => handleClick(e, filters.genres));
    }

    for (const title of titlesOfAuthors) {
      title.addEventListener("click", (e) => handleClick(e, filters.authors));
    }

    filterBtn.addEventListener("click", (e) => filterBooks(e, allBooks));
  } catch (error) {
    console.error("Error occurred:", error);
  }
});
