let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

// h1 no html normalmente é o que vai definir o texto mais importante a ser mostrado na página
// -> let titulo = document.querySelector('h1'); 
// relacionar o "document" faz referência ao arquivo em html, nesse caso chamado de "index
//"querySelector" serve para definir exatamente qual o pedaço do html que você quer referenciar
// -> titulo.innerHTML = 'Jogo do número secreto';
// "variavel.innerHTML = innerHTML vai definir o texto a ser inserido, conforme repetido no exemplo abaixo"
// -> let paragrafo = document.querySelector('p');
// -> paragrafo.innerHTML = 'Escolha um número entre 1 e 10';

// evitar repetição de códigos com uma função
function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
exibirTextoNaTela('h1', 'Jogo do número secreto');
exibirTextoNaTela('p', 'Escolha um número entre 1 e 10.');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;

    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O número é menor do que ${chute}.`);
        } else {
            exibirTextoNaTela('p', `O número é maior do que ${chute}.`);
        } 
        tentativas++;
        limparCampo();
    }
}

// "booleano" significa verdadeiro ou falso
// se tratanto de "listas", utilizaremos quase sempre o colchete []

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }


    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}