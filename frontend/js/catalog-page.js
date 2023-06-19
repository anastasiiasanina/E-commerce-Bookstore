//elements of price slider
const rangeInput = document.querySelectorAll('.range-input input');
const priceInput = document.querySelectorAll('.price-input input');
const range = document.querySelector('.slider .progress');

//filter options
const titlesOfGenres = document.getElementsByClassName('title');
const titlesOfAuthors = document.getElementsByClassName('author');

//buttons and labels for finding books
const filterBtn = document.querySelector('.find-btn');
const mainTitle = document.querySelector('[changing-title]');

//chosen filter options
const filters = {
  genres: [], 
  authors: [],
  price: []
}

const handleClick = (e, arr) => {
  const selectedText = e.target.textContent;

  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    let index = arr.indexOf(selectedText);
    arr.splice(index, 1);
  } else {
    e.target.classList.add('active');
    arr.push(selectedText);
  }
}

const handlePriceSlider = (e) => {
  let priceGap = 10;
  let minVal = parseInt(rangeInput[0].value);
  let maxVal = parseInt(rangeInput[1].value);

  if (maxVal - minVal < priceGap) {
    if (e.target.className === 'range-min') {
      rangeInput[0].value = maxVal - priceGap;
    } else {
      rangeInput[1].value = minVal + priceGap;
    }
  } else {
    priceInput[0].value = minVal;
    priceInput[1].value = maxVal;
    range.style.left = (minVal / rangeInput[0].max) * 100 + '%';
    range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + '%';
  }
}

const getFilters = () => {
  let minPrice = priceInput[0].value;
  let maxPrice = priceInput[1].value;
  filters.price = [minPrice, maxPrice];
  console.log(filters);
  mainTitle.textContent = 'Found Books';
  return filters;
}

for (const title of titlesOfGenres) {
  title.addEventListener('click', (e) => handleClick(e, filters.genres));
}

for (const title of titlesOfAuthors) {
  title.addEventListener('click', (e) => handleClick(e, filters.authors));
}

for (const input of rangeInput) {
  input.addEventListener('input', handlePriceSlider);
}

filterBtn.addEventListener('click', getFilters);


//showing books
const bookListTemplate = document.querySelector('[books-list-template]');
const bookListContainer = document.querySelector('[data-books-list-container]');
let bookResults = [];
let bd = [];

document.addEventListener('DOMContentLoaded', () => {
      bd.map((book) => {
      const card = bookListTemplate.content.cloneNode(true).children[0];
      const bookNameHeader = card.querySelector("[data-name-book]");
      const bookAuthorHeader = card.querySelector("[data-author-book]");
      const bookPriceHeader = card.querySelector("[data-price-book]");
      bookNameHeader.textContent = book.name;
      bookAuthorHeader.textContent = book.author;
      bookPriceHeader.textContent = book.price;
      bookListContainer.append(card);
    });
})


