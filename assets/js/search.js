document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("searchResults");

  let searchIndex = [];

  fetch("/index.json")
    .then((res) => res.json())
    .then((data) => {
      searchIndex = data;
    });

  searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase();
    resultsContainer.innerHTML = "";

    if (query.length < 2) return;

    const results = searchIndex.filter((page) =>
      page.title.toLowerCase().includes(query) ||
      page.content.toLowerCase().includes(query)
    );

    results.forEach((page) => {
      const item = document.createElement("div");
      item.innerHTML = `<a href="${page.url}" class="block text-white py-1 hover:underline">${page.title}</a>`;
      resultsContainer.appendChild(item);
    });
  });
});
