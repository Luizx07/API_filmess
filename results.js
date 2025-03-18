'use strict'
document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const query = params.get("query");

    if (query) {
        fetchMovies(query);
    }
});

async function fetchMovies(query) {
    const apiKey = "K66WoK3A5L3ukxBkspeOqxT1GmAHOIXf44qDJAvG";
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${apiKey}&search_value=${encodeURIComponent(query)}&search_type=`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        displayResults(data.results);
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

function displayResults(results) {
    const resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    if (!results || results.length === 0) {
        resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    results.forEach(item => {
        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");

        const img = document.createElement("img");
        img.src = item.image_url || "https://via.placeholder.com/80x120";
        img.alt = item.name;

        const info = document.createElement("div");
        info.classList.add("result-info");

        const title = document.createElement("h3");
        title.textContent = item.name;

        const year = document.createElement("p");
        year.textContent = `Ano de lançamento: ${item.year || "Desconhecido"}`;

        const type = document.createElement("p");
        type.textContent = `Tipo: ${item.type || "Desconhecido"}`;

        const link = document.createElement("a");
        link.href = `detalhes.html?id=${item.id}`;
        link.textContent = "Saiba mais sobre...";

        info.appendChild(title);
        info.appendChild(year);
        info.appendChild(type);
        info.appendChild(link);

        resultItem.appendChild(img);
        resultItem.appendChild(info);

        resultsContainer.appendChild(resultItem);
    });
}

function goBack() {
    window.location.href = "index.html";
}
