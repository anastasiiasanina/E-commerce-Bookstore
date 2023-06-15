const rangeInput = document.querySelectorAll(".range-input input"),
  priceInput = document.querySelectorAll(".price-input input"),
  range = document.querySelector(".slider .progress");
let priceGap = 10;

priceInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minPrice = parseInt(priceInput[0].value),
      maxPrice = parseInt(priceInput[1].value);

    if (maxPrice - minPrice >= priceGap && maxPrice <= rangeInput[1].max) {
      if (e.target.className === "input-min") {
        rangeInput[0].value = minPrice;
        range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
      } else {
        rangeInput[1].value = maxPrice;
        range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
      }
    }
  });
});

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value),
      maxVal = parseInt(rangeInput[1].value);

    if (maxVal - minVal < priceGap) {
      if (e.target.className === "range-min") {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      priceInput[0].value = minVal;
      priceInput[1].value = maxVal;
      range.style.left = (minVal / rangeInput[0].max) * 100 + "%";
      range.style.right = 100 - (maxVal / rangeInput[1].max) * 100 + "%";
    }
  });
});
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
