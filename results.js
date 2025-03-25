'use strict'

// aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
    const parametros = new URLSearchParams(window.location.search)
    const consulta = parametros.get("query")

    if (consulta) {
        buscarFilmes(consulta) // se tiver uma consulta, chama a função para buscar filmes
    }
})

// busca filmes na API Watchmode com base na consulta do usuário
async function buscarFilmes(consulta) {
    const chaveApi = "K66WoK3A5L3ukxBkspeOqxT1GmAHOIXf44qDJAvG" // Chave da API para autenticação
    const url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${chaveApi}&search_value=${encodeURIComponent(consulta)}&search_type=`

    try {
        const resposta = await fetch(url)
        const dados = await resposta.json()
        exibirResultadosFilmes(dados.results)
    } catch (erro) {
        console.error("Erro ao buscar dados:", erro) // exibe um erro no console se a requisição falhar
    }
}

// exibi os resultados da busca na tela
function exibirResultadosFilmes(resultados) {
    const containerResultados = document.getElementById("results")
    containerResultados.innerHTML = "" // limpa o conteúdo anterior antes de exibir novos resultados

    if (!resultados || resultados.length === 0) { // verifica se não há resultados
        containerResultados.innerHTML = "<p>Nenhum resultado encontrado.</p>"
        return
    }

    resultados.forEach(item => {
        const elementoResultado = document.createElement("div")
        elementoResultado.classList.add("result-item")

        const imagem = document.createElement("img")
        imagem.src = item.image_url || "https://via.placeholder.com/80x120"
        imagem.alt = item.name

        const informacoes = document.createElement("div")
        informacoes.classList.add("result-info")

        const titulo = document.createElement("h3")
        titulo.textContent = item.name

        const ano = document.createElement("p")
        ano.textContent = `Ano de lançamento: ${item.year}`

        const tipo = document.createElement("p")
        tipo.textContent = `Tipo: ${item.type }`

        const link = document.createElement("a")
        link.href = `detalhes.html?id=${item.id}`
        link.textContent = "Saiba mais sobre..." 


        informacoes.appendChild(titulo)
        informacoes.appendChild(ano)
        informacoes.appendChild(tipo)
        informacoes.appendChild(link)
        elementoResultado.appendChild(imagem)
        elementoResultado.appendChild(informacoes)

        containerResultados.appendChild(elementoResultado)
    })
}

// Função para voltar à página inicial
function voltar() {
    window.location.href = "index.html" // redireciona o usuário para a página inicial
}
