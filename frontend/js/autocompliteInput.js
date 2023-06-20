let arrKeywords = [
  "The Adventures of Sherlock Holmes",
  "It Ends With Us",
  "Goblet of Fire",
  "The Picture of Dorian Gray",
];

inputField.addEventListener("input", () => {
  let searchResult = [];
  let inputedSearch = inputField.value;
  searchResult = arrKeywords.filter((keyword) => {
    return keyword.toLowerCase().includes(inputedSearch.toLowerCase());
  });
  displayDropBox(searchResult);
});

const displayDropBox = (searchResult) => {
  const ulElem = document.createElement("ul");
  searchResult.filter((list) => {
    let liElem = document.createElement("li");
    liElem.textContent = list;
    liElem.addEventListener("click", () => {
      inputField.value = liElem.textContent;
    });
    ulElem.appendChild(liElem);
  });

  resultBox.innerHTML = "";
  resultBox.appendChild(ulElem);
};

document.addEventListener("click", (event) => {
  const target = event.target;
  if (!resultBox.contains(target)) {
    resultBox.innerHTML = "";
  }
});
