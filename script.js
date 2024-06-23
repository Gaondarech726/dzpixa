// function fetchImages(page = 1) {
//   const apiKey = "44507897-53b7e7ea826134529740b53ca";
//   const url = `https://pixabay.com/api/?key=${apiKey}&category_id=106&image_type=photo&per_page=20&page=${page}`;

//   fetch(url)
//     .then((response) => response.json())
//     .then((data) => {
//       const images = data.hits;
//       displayImages(images);

//       if (data.totalHits > page * 20) {
//         showLoadMoreButton();
//       } else {
//         hideLoadMoreButton();
//       }
//     })
//     .catch((error) => console.error("Помилка:", error));
// }

function displayImages(images) {
  const imagesContainer = document.getElementById("images-container");

  images.forEach((image) => {
    const imageElement = document.createElement("div");
    imageElement.classList.add("image");

    const imageLink = document.createElement("a");
    imageLink.href = image.url;
    imageLink.target = "_blank";

    const imagePreview = document.createElement("img");
    imagePreview.src = image.webformatURL;
    imagePreview.alt = image.tags;

    imageLink.appendChild(imagePreview);
    imageElement.appendChild(imageLink);

    imagesContainer.appendChild(imageElement);
  });
}

function showLoadMoreButton() {
  const button = document.getElementById("load-more");
  button.style.display = "block";
}

function hideLoadMoreButton() {
  const button = document.getElementById("load-more");
  button.style.display = "none";
}

function loadCurrentPage() {
  const currentPage = localStorage.getItem("currentPage");
  return currentPage ? parseInt(currentPage) : 1;
}

function saveCurrentPage(currentPage) {
  localStorage.setItem("currentPage", currentPage);
}

document.getElementById("load-more").addEventListener("click", () => {
  const currentPage = loadCurrentPage() + 1;
  saveCurrentPage(currentPage);
  document.getElementById("current-page").value = currentPage;

  const searchTerm = searchInput.value.toLowerCase();
  fetchImages(currentPage, searchTerm);
});

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  fetchImages(1, searchTerm);
});

function fetchImages(page = 1, searchTerm = "") {
  const apiKey = "44507897-53b7e7ea826134529740b53ca";
  let url = `https://pixabay.com/api/?key=${apiKey}&category_id=106&image_type=photo&per_page=20&page=${page}`;

  if (searchTerm) {
    url += `&q=${searchTerm}`;
  }

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const images = data.hits;
      displayImages(images);

      if (data.totalHits > page * 20) {
        showLoadMoreButton();
      } else {
        hideLoadMoreButton();
      }
    })
    .catch((error) => console.error("Помилка:", error));
}
