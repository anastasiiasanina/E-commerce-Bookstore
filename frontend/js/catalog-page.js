//elements of price slider
const rangeInput = document.querySelectorAll(".range-input input");
const priceInput = document.querySelectorAll(".price-input input");
const range = document.querySelector(".slider .progress");

//filter options
const titlesOfGenres = document.getElementsByClassName("title");
const titlesOfAuthors = document.getElementsByClassName("author");

//search engine
const inputField = document.querySelector("#searchbar");
const searchButton = document.querySelector("#search");

//button 'find books'
const filterBtn = document.querySelector(".find-btn");
const searchInput = document.querySelector(".searchInput");
const resultBox = document.querySelector(".resultBox");

//chosen filter options
const filters = {
  genres: [],
  authors: [],
  price: [],
};

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

const handlePriceSlider = (e) => {
  let priceGap = 10;
  let minVal = parseInt(rangeInput[0].value);
  let maxVal = parseInt(rangeInput[1].value);

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
};

const getFilters = () => {
  let minPrice = priceInput[0].value;
  let maxPrice = priceInput[1].value;
  filters.price = [minPrice, maxPrice];
  console.log(filters);
  return filters;
};

for (const title of titlesOfGenres) {
  title.addEventListener("click", (e) => handleClick(e, filters.genres));
}

for (const title of titlesOfAuthors) {
  title.addEventListener("click", (e) => handleClick(e, filters.authors));
}

for (const input of rangeInput) {
  input.addEventListener("input", handlePriceSlider);
}

filterBtn.addEventListener("click", getFilters);

const handleSearchClick = (e) => {
  const input = inputField.value;
  if (input == "") {
    inputField.classList.add("error");
  } else {
    inputField.classList.remove("error");
    inputField.value = "";
    const searchURL = "/search?query=" + encodeURIComponent(input);
    window.open(searchURL, "_blank");
  }
};

searchButton.addEventListener("click", handleSearchClick);

//DropBox
let arrKeywords = [
  "The Adventures of Sherlock Holmes",
  "It Ends With Us",
  "Goblet of Fire",
  "The Picture of Dorian Gray",
];
inputField.onkeyup = function () {
  let db = [];
  let inputedSearch = inputField.value;
  if (inputedSearch.length) {
    db = arrKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(inputedSearch.toLowerCase());
    });
    console.log(db);
  }
  displayDropBox(db);
};
function displayDropBox(db) {
  const content = db.map((list) => {
    return "<li>" + list + "</li>";
  });
  resultBox.innerHTML = "<ul>" + content.join("") + "</ul>";
}
