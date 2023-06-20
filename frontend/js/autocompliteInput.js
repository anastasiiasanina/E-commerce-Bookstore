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

  const displayDropBox = (searchResult) => {
    const ulElem = document.createElement("ul");
    searchResult.forEach((list) => {
      const liElem = document.createElement("li");
      liElem.textContent = list;
      liElem.addEventListener("click", () => {
        inputField.value = liElem.textContent;
      });
      ulElem.appendChild(liElem);
    });

    clearResultBox();
    resultBox.appendChild(ulElem);
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
