const campos = ['nome', 'email', 'cep', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado'];
const mensagem = document.getElementById('mensagem');

// Busca o endereço na API do ViaCEP a partir do CEP digitado
async function buscarEndereco(cep) {
    const cepLimpo = cep.replace(/\D/g, '');

    if (cepLimpo.length !== 8) {
        mensagem.innerText = 'CEP inválido. Digite 8 números.';
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            mensagem.innerText = 'CEP não encontrado.';
            return;
        }

        document.getElementById('rua').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = dados.localidade;
        document.getElementById('estado').value = dados.uf;
        mensagem.innerText = 'Endereço preenchido com sucesso.';

        salvarDados();
    } catch (erro) {
        mensagem.innerText = 'Erro ao buscar o CEP.';
    }
}

// Salva todos os campos no localStorage
function salvarDados() {
    const dados = {};
    campos.forEach(function(id) {
        dados[id] = document.getElementById(id).value;
    });
    localStorage.setItem('cadastro', JSON.stringify(dados));
}

// Restaura os dados salvos ao abrir a página
function restaurarDados() {
    const salvos = localStorage.getItem('cadastro');
    if (salvos) {
        const dados = JSON.parse(salvos);
        campos.forEach(function(id) {
            document.getElementById(id).value = dados[id] || '';
        });
    }
}

// Ao sair do campo CEP, busca o endereço
document.getElementById('cep').addEventListener('blur', function() {
    buscarEndereco(this.value);
});

// Salva sempre que qualquer campo for alterado
campos.forEach(function(id) {
    document.getElementById(id).addEventListener('input', salvarDados);
});

// Botão para apagar os dados salvos
document.getElementById('limpar').addEventListener('click', function() {
    localStorage.removeItem('cadastro');
    campos.forEach(function(id) {
        document.getElementById(id).value = '';
    });
    mensagem.innerText = 'Dados apagados.';
});

// Restaura os dados assim que a página carrega
restaurarDados();
