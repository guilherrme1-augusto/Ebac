const numeroSecreto = Math.floor(Math.random() * 100) + 1;
const maxTentativas = 10;
let tentativasRestantes = maxTentativas;

const input = document.getElementById('palpite');
const botao = document.getElementById('chutar');
const mensagem = document.getElementById('mensagem');
const tentativas = document.getElementById('tentativas');

botao.addEventListener('click', function() {
    const palpite = parseInt(input.value);

    if (isNaN(palpite) || palpite < 1 || palpite > 100) {
        mensagem.innerText = 'Digite um número válido entre 1 e 100.';
        return;
    }

    if (palpite === numeroSecreto) {
        mensagem.innerText = 'Você acertou!';
        encerrarJogo();
        return;
    }

    if (numeroSecreto > palpite) {
        mensagem.innerText = 'O número secreto é maior';
    } else {
        mensagem.innerText = 'O número secreto é menor';
    }

    tentativasRestantes--;
    tentativas.innerText = 'Tentativas restantes: ' + tentativasRestantes;

    if (tentativasRestantes === 0) {
        mensagem.innerText = 'Você perdeu! O número secreto era ' + numeroSecreto;
        encerrarJogo();
    }

    input.value = '';
});

function encerrarJogo() {
    input.disabled = true;
    botao.disabled = true;
}
