"use strict";

const inputSearchModule = (function () {
  const arrKeywords = [
    "The Adventures of Sherlock Holmes",
    "It Ends With Us",
    "Goblet of Fire",
    "The Picture of Dorian Gray",
  ];

  const handleInput = () => {
    const inputedSearch = inputField.value;
    const searchResult = arrKeywords.filter((keyword) => {
      return keyword.toLowerCase().includes(inputedSearch.toLowerCase());
    });
    displayDropBox(searchResult);
  };

  const handleDocumentClick = (event) => {
    const target = event.target;
    if (!resultBox.contains(target)) {
      clearResultBox();
    }
  };

  const clearResultBox = () => {
    resultBox.innerHTML = "";
  };

  const createListItems = (searchResult) => {
    return searchResult.map((list) => {
      const liElem = document.createElement("li");
      liElem.textContent = list;

      liElem.addEventListener("click", () => {
        inputField.value = list;
      });

      return liElem;
    });
  };

  const appendListItems = (listItems) => {
    const ulElem = document.createElement("ul");
    ulElem.append(...listItems);

    clearResultBox();
    resultBox.appendChild(ulElem);
  };

  const displayDropBox = (searchResult) => {
    const listItems = createListItems(searchResult);
    appendListItems(listItems);
  };

  const initialize = () => {
    inputField.addEventListener("input", handleInput);
    document.addEventListener("click", handleDocumentClick);
  };

  return {
    initialize: initialize,
  };
})();

inputSearchModule.initialize();
