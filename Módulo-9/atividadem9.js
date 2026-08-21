// IMPORTANTE: acesse https://crudcrud.com, copie a sua URL e cole abaixo.
// A URL é pessoal e expira em 24 horas na versão gratuita.
const API_URL = 'https://crudcrud.com/api/6c45e71557a64ffd8ce50cfc7166b81f/clientes';

const nome = document.getElementById('nome');
const email = document.getElementById('email');
const lista = document.getElementById('lista');
const mensagem = document.getElementById('mensagem');

// GET: busca todos os clientes e mostra na tela
async function listarClientes() {
    try {
        const resposta = await fetch(API_URL);
        const clientes = await resposta.json();

        lista.innerHTML = '';
        clientes.forEach(function(cliente) {
            const item = document.createElement('li');
            item.innerText = `${cliente.nome} - ${cliente.email}`;

            const botao = document.createElement('button');
            botao.innerText = 'Excluir';
            botao.className = 'excluir';
            botao.addEventListener('click', function() {
                excluirCliente(cliente._id);
            });

            item.appendChild(botao);
            lista.appendChild(item);
        });
    } catch (erro) {
        mensagem.innerText = 'Erro ao listar clientes.';
        console.log(erro);
    }
}

// POST: cadastra um novo cliente
async function cadastrarCliente() {
    if (nome.value === '' || email.value === '') {
        mensagem.innerText = 'Preencha nome e e-mail.';
        return;
    }

    const cliente = {
        nome: nome.value,
        email: email.value
    };

    try {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente)
        });

        mensagem.innerText = 'Cliente cadastrado com sucesso.';
        nome.value = '';
        email.value = '';
        listarClientes();
    } catch (erro) {
        mensagem.innerText = 'Erro ao cadastrar cliente.';
        console.log(erro);
    }
}

// DELETE: remove um cliente pelo id
async function excluirCliente(id) {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
        listarClientes();
    } catch (erro) {
        mensagem.innerText = 'Erro ao excluir cliente.';
        console.log(erro);
    }
}

document.getElementById('cadastrar').addEventListener('click', cadastrarCliente);

// Lista os clientes assim que a página carrega
listarClientes();
