'use strict'
document.getElementById("search-button").addEventListener("click", redirecionarParaResultados);
document.getElementById("search-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        redirecionarParaResultados();
    }
});

function redirecionarParaResultados() {
    const consulta = document.getElementById("search-input").value.trim();
    if (!consulta) return;

    window.location.href = `results.html?query=${encodeURIComponent(consulta)}`;
}
