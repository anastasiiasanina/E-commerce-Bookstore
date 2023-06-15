//elements of price slider
const rangeInput = document.querySelectorAll('.range-input input');
const priceInput = document.querySelectorAll('.price-input input');
const range = document.querySelector('.slider .progress');

//filter options
const titlesOfGenres = document.getElementsByClassName('title');
const titlesOfAuthors = document.getElementsByClassName('author');

//button 'find books'
const filterBtn = document.querySelector('.find-btn');

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

filterBtn.addEventListener('click', getFilters)


//searching books
const bookListTemplate = document.querySelector("[books-list-template]");
const bookListContainer = document.querySelector("[data-books-list-container]");
const searchInput = document.querySelector("[data-search]");
let bookNames = [];

searchInput.addEventListener("input", (event) => {
  const value = event.target.value.toLowerCase();
  bookNames.map((bookName) => {
    let formatBooksName = bookName.name.toLowerCase();
    const isVisible = formatBooksName.includes(value);
    bookName.element.classList.toggle("hide", !isVisible);
  });
});

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => {
    bookNames = data.map((bookName) => {
      const card = bookListTemplate.content.cloneNode(true).children[0];
      const bookNameHeader = card.querySelector("[data-name-book]");
      const bookPrice = card.querySelector("[data-price-book]");
      bookNameHeader.textContent = bookName.name;
      bookPrice.textContent = bookName.id;
      bookListContainer.append(card);
      return { name: bookName.name, id: bookName.id, element: card };
    });
  });
