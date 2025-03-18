'use strict'

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    fetchData(query);
});

async function fetchData(query) {
    const response = await fetch(`https://api.example.com/search?query=${query}`);
    const data = await response.json();
    displayResults(data);
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = '';

    data.results.forEach(item => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <h3>${item.title}</h3>
            <p>Ano de lançamento: ${item.release_year}</p>
            <p>Tipo: ${item.type}</p>
            <p><a href="#">Saiba mais sobre...</a></p>
        `;
        resultsContainer.appendChild(resultItem);
    });
}