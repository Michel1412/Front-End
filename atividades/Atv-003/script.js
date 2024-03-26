var palavraCorreta = "TESTE";
const linhas       = document.querySelectorAll('.linha');
var linhaAtual     = 0
var indiceAtual    = 0;

function verificar() {
    const quadros = linhas[linhaAtual].querySelectorAll('.quadro');
    var palavra = '';
    for (var i = 0; i < quadros.length; i++) {
        palavra += quadros[i].textContent;
    }
    console.log(palavra);

    if (palavra.length < quadros.length) {
        console.error('Digite ao menos 5 letras!');
        return;
    }

    if (palavra == palavraCorreta) {
        alert('Parabens, voce acertou a palavra!');
        indiceAtual = 0;
        for (var i = 0; i < quadros.length; i++) {
            quadros[i].textContent = '';
        }
    } else {
        if (linhaAtual == 5) {
            alert('Voce perdeu o jogo!');
            linhas.forEach(linha => linha.forEach(quadro => quadro.textContent = ''));
            linhaAtual  = 0;
        } else {
            alert('Tente novamente!');
            verificaQuadro(quadros);
            linhaAtual++;
        }
        indiceAtual = 0;
    }
}

function verificaQuadro(quadros) {
    for (var i = 0; i < quadros.length; i++) {
        var quadroValue = quadros[i].textContent;
        if (palavraCorreta[i] === quadroValue) {
            quadros[i].style.backgroundColor = '#5c9b6fad'
        } else if (palavraCorreta.includes(quadroValue)) {
            quadros[i].style.backgroundColor = '#9b935cad'
        }
    }
}

function colocaQuadradoPula(tecla) {
    const quadros = linhas[linhaAtual].querySelectorAll('.quadro');
    if (indiceAtual < quadros.length) {
        quadros[indiceAtual].textContent = tecla.textContent;
        indiceAtual++;
    }
}

function remover(){
    const quadros = linhas[linhaAtual].querySelectorAll('.quadro');
    if (indiceAtual > 0) {
        indiceAtual--;
        quadros[indiceAtual].textContent = '';
    }
}