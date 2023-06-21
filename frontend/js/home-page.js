const inputField = document.querySelector("#searchbar");
const searchButton = document.querySelector("#search");

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
