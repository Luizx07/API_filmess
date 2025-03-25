'use strict'

document.getElementById('search-button').addEventListener('click', function() { 
    const consulta = document.getElementById('search').value;
    buscarDados(consulta);
});

async function buscarDados(consulta) {
    const resposta = await fetch(`https://api.example.com/search?query=${consulta}`);
    const dados = await resposta.json();
    exibirResultados(dados);
}

function exibirResultados(dados) {
    const containerResultados = document.getElementById('results');
    containerResultados.innerHTML = '';

    dados.results.forEach(item => {
        const elementoResultado = document.createElement('div');
        elementoResultado.classList.add('result-item');
        elementoResultado.innerHTML = `
            <h3>${item.title}</h3>
            <p>Ano de lançamento: ${item.release_year}</p>
            <p>Tipo: ${item.type}</p>
            <p><a href="#">Saiba mais sobre...</a></p>
        `;
        containerResultados.appendChild(elementoResultado);
    });
}
