'use strict'

document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const movieId = params.get("id");  // Captura o ID do filme da URL

    console.log("ID do filme:", movieId); // Verificação do ID passado na URL

    if (movieId) {
        fetchDetalhes(movieId);  // Chamando a função para pegar os detalhes do filme
    } else {
        console.error("ID do filme não encontrado na URL!");
        document.getElementById("detalhes").innerHTML = "<p>Erro: ID do filme não encontrado.</p>";
    }
});

async function fetchDetalhes(id) {  // Alterado de "fetchMovieDetails" para "fetchDetalhes"
    const apiKey = "K66WoK3A5L3ukxBkspeOqxT1GmAHOIXf44qDJAvG";
    const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${apiKey}&append_to_response=sources`;

    try {
        console.log("Fazendo requisição para a API com URL:", url); // Verificação da URL de requisição
        const response = await fetch(url);
        
        // Verifica se a resposta da API é válida
        if (!response.ok) {
            throw new Error("Erro na resposta da API");
        }
        
        const data = await response.json();

        console.log("Dados retornados:", data); // Verificação dos dados recebidos da API

        displayDetalhes(data);  // Exibindo os detalhes do filme
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
        document.getElementById("detalhes").innerHTML = "<p>Erro ao carregar as informações do filme.</p>";
    }
}

function displayDetalhes(data) {  // Exibe os detalhes do filme na página
    const detalhesContainer = document.getElementById("detalhes");

    if (!data) {
        detalhesContainer.innerHTML = "<p>Detalhes não encontrados.</p>";
        return;
    }

    // Verificar se os dados têm as propriedades necessárias
    const banner = data.poster ? `<img src="${data.posterMedium}" alt="${data.title}" class="movie-banner">` : '';
    const titulo = `<h2>${data.title || "Título não disponível"}</h2>`;
    const data_lacamento = `<p><strong>Data de lançamento:</strong> ${data.release_date || "Desconhecido"}</p>`;
    const generos = `<p><strong>Gêneros:</strong> ${data.genres ? data.genres.join(", ") : "Desconhecido"}</p>`;
    const sinopse = `<p><strong>Sinopse:</strong> ${data.plot_overview || "Sinopse não disponível."}</p>`;
    const avaliacoes = `<p><strong>Avaliações:</strong> ${data.user_rating || "Sem avaliações."}</p>`;
    const streams = data.sources ? 
        `<p><strong>Onde Assistir:</strong> ${data.sources.map(source => `<a href="${source.url}" target="_blank">${source.name}</a>`).join(", ")}</p>` 
        : "<p><strong>Onde Assistir:</strong> Não disponível.</p>";

    detalhesContainer.innerHTML = `
        ${banner}
        ${titulo}
        ${data_lacamento}
        ${generos}
        ${sinopse}
        ${avaliacoes}
        ${streams}
    `;
}
function goBack() {
    window.location.href = "index.html";  // Redireciona para a página de resultados
}


