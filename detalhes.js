'use strict' 

// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
    const parametros = new URLSearchParams(window.location.search)
    const idFilme = parametros.get("id")

    console.log("ID do filme:", idFilme)

    if (idFilme) {
        buscarDetalhes(idFilme)
    } else {
        console.error("ID do filme não encontrado na URL!") // exibe um erro no console se o ID não for encontrado
        document.getElementById("detalhes").innerHTML = "<p>Erro: ID do filme não encontrado.</p>"// exibe mensagem de erro
    }
})

//busca detalhes do filme na API Watchmode
async function buscarDetalhes(id) {
    const chaveApi = "K66WoK3A5L3ukxBkspeOqxT1GmAHOIXf44qDJAvG" // Chave da API para autenticação
    const url = `https://api.watchmode.com/v1/title/${id}/details/?apiKey=${chaveApi}&append_to_response=sources`

    try {
        console.log("Fazendo requisição para a API com URL:", url)
        const resposta = await fetch(url)// Faz a requisição à API

        if (!resposta.ok) { // ve se a resposta foi bem-sucedida
            throw new Error("Erro na resposta da API")
        }
        
        const dados = await resposta.json()

        console.log("Dados retornados:", dados)
        exibirDetalhes(dados)
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro)
        document.getElementById("detalhes").innerHTML = "<p>Erro ao carregar as informações do filme.</p>"
    }
}

// exibi os detalhes do filme na tela
function exibirDetalhes(dados) {
    const containerDetalhes = document.getElementById("detalhes")

    if (!dados) { // verifica se não há dados não encontrados
        containerDetalhes.innerHTML = "<p>Detalhes não encontrados.</p>"
        return
    }

    // Monta o HTML com os detalhes do filme
    const banner = dados.poster ? `<img src="${dados.posterMedium}" alt="${dados.title}" class="movie-banner">` : ''
    const titulo = `<h2>${dados.title || "Título não disponível"}</h2>`
    const dataLancamento = `<p><strong>Data de lançamento:</strong> ${dados.release_date || "Desconhecido"}</p>`
    const generos = `<p><strong>Gêneros:</strong> ${dados.genre_names ? dados.genre_names.join(", ") : "Desconhecido"}</p>`
    const sinopse = `<p><strong>Sinopse:</strong> ${dados.plot_overview || "Sinopse não disponível."}</p>`
    const avaliacoes = `<p><strong>Avaliações:</strong> ${dados.user_rating || "Sem avaliações."}</p>`// exibe a nota do filme ou "Sem avaliações"
    
    // exibe os links para assistir ao filme, se disponíveis
    const streams = dados.sources ? 
        `<p><strong>Onde Assistir:</strong> ${dados.sources.map(source => `<a href="${source.url}" target="_blank">${source.name}</a>`).join(", ")}</p>` 
        : "<p><strong>Onde Assistir:</strong> Não disponível.</p>"

    // atualiza o container com os detalhes do filme
    containerDetalhes.innerHTML = `
        ${banner}
        ${titulo}
        ${dataLancamento}
        ${generos}
        ${sinopse}
        ${avaliacoes}
        ${streams}
    `
}

function voltar() {
    window.location.href = "index.html"
}

