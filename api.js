'use strict'

document.getElementById('search-button').addEventListener('click', function() { 
    const consulta = document.getElementById('search').value
    buscarDados(consulta)
})

async function buscarDados(consulta) {
    const resposta = await fetch(`https://api.example.com/search?query=${consulta}`)
    const dados = await resposta.json()
}