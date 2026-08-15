class Parquimetro {
    constructor() {
        this.tabela = [
            { preco: 3.00, minutos: 120 },
            { preco: 1.75, minutos: 60 },
            { preco: 0.00, minutos: 30 }
        ];
    }

    calcular(valor) {
        if (isNaN(valor) || valor < 0) {
            return { erro: 'Valor insuficiente' };
        }

        for (const faixa of this.tabela) {
            if (valor >= faixa.preco) {
                return {
                    minutos: faixa.minutos,
                    troco: valor - faixa.preco
                };
            }
        }
    }
}

const parquimetro = new Parquimetro();

document.getElementById('calcular').addEventListener('click', function() {
    const valor = parseFloat(document.getElementById('valor').value);
    const tempo = document.getElementById('tempo');
    const troco = document.getElementById('troco');

    const resultado = parquimetro.calcular(valor);

    if (resultado.erro) {
        tempo.innerText = resultado.erro;
        troco.innerText = '';
        return;
    }

    tempo.innerText = `Tempo de permanência: ${resultado.minutos} minutos`;
    troco.innerText = `Troco: R$ ${resultado.troco.toFixed(2)}`;
});
