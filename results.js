'use strict'

document.addEventListener("DOMContentLoaded", function () {
    const parametros = new URLSearchParams(window.location.search);
    const consulta = parametros.get("query");

    if (consulta) {
        buscarFilmes(consulta);
    }
});

async function buscarFilmes(consulta) {
    const chaveApi = "K66WoK3A5L3ukxBkspeOqxT1GmAHOIXf44qDJAvG";
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${chaveApi}&search_value=${encodeURIComponent(consulta)}&search_type=`;

    try {
        const resposta = await fetch(url);
        const dados = await resposta.json();
        exibirResultadosFilmes(dados.results);
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro);
    }
}

function exibirResultadosFilmes(resultados) {
    const containerResultados = document.getElementById("results");
    containerResultados.innerHTML = "";

    if (!resultados || resultados.length === 0) {
        containerResultados.innerHTML = "<p>Nenhum resultado encontrado.</p>";
        return;
    }

    resultados.forEach(item => {
        const elementoResultado = document.createElement("div");
        elementoResultado.classList.add("result-item");

        const imagem = document.createElement("img");
        imagem.src = item.image_url || "https://via.placeholder.com/80x120";
        imagem.alt = item.name;

        const informacoes = document.createElement("div");
        informacoes.classList.add("result-info");

        const titulo = document.createElement("h3");
        titulo.textContent = item.name;

        const ano = document.createElement("p");
        ano.textContent = `Ano de lançamento: ${item.year || "Desconhecido"}`;

        const tipo = document.createElement("p");
        tipo.textContent = `Tipo: ${item.type || "Desconhecido"}`;

        const link = document.createElement("a");
        link.href = `detalhes.html?id=${item.id}`;
        link.textContent = "Saiba mais sobre...";

        informacoes.appendChild(titulo);
        informacoes.appendChild(ano);
        informacoes.appendChild(tipo);
        informacoes.appendChild(link);

        elementoResultado.appendChild(imagem);
        elementoResultado.appendChild(informacoes);

        containerResultados.appendChild(elementoResultado);
    });
}

function voltar() {
    window.location.href = "index.html";
}