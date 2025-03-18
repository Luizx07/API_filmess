'use strict'
document.getElementById("search-button").addEventListener("click", redirectToResults);
document.getElementById("search-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        redirectToResults();
    }
});

function redirectToResults() {
    const query = document.getElementById("search-input").value.trim();
    if (!query) return;
    
    // Redireciona para a página de resultados com o termo na URL
    window.location.href = `results.html?query=${encodeURIComponent(query)}`;
}
