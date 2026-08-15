document.getElementById('calcular').addEventListener('click', function() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value);

    if (peso > 0 && altura > 0) {
        const imc = peso / (altura * altura);
        document.getElementById('resultado-imc').innerText = `IMC: ${imc.toFixed(2)}`;

        let classificacao = '';

        if (imc < 18.5) {
            classificacao = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            classificacao = 'Peso normal';
        } else if (imc >= 25 && imc < 29.9) {
            classificacao = 'Sobrepeso';
        } else {
            classificacao = 'Obesidade';
        }

        document.getElementById('classificacao').innerText = `Classificação: ${classificacao}`;
    } else {
        alert('Por favor, insira valores válidos para peso e altura.');
    }
});
