'use strict'

// Adiciona a função de clique ao botão de busca
document.getElementById("search-button").addEventListener("click", redirecionarParaResultados)

// Adiciona um evento ao campo de entrada para capturar a tecla "Enter" e chamar a função redirecionarParaResultados
document.getElementById("search-input").addEventListener("keypress", function (e) {
    if (e.key === "Enter") { // Verifica se a tecla pressionada foi "Enter"
        redirecionarParaResultados() // Chama a função para redirecionar o usuário
    }
})

// responsável por levar para a página de resultados
function redirecionarParaResultados() {
    const consulta = document.getElementById("search-input").value.trim()

    if (!consulta) return // Se o campo estiver vazio, a função é encerrada

    // redireciona para a página "results.html"
    window.location.href = `results.html?query=${encodeURIComponent(consulta)}`
}
