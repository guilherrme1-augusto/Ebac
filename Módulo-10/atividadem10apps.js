import { Cliente, ClienteService } from './classes.js';
import { validarCampos, buscarPorId, contarClientes } from './utils.js';

// IMPORTANTE: acesse https://crudcrud.com, copie a sua URL e cole abaixo.
// A URL é pessoal e expira em 24 horas na versão gratuita.
const API_URL = 'https://crudcrud.com/api/6c45e71557a64ffd8ce50cfc7166b81f/clientes';

const servico = new ClienteService(API_URL);

const nomeInput = document.getElementById('nome');
const emailInput = document.getElementById('email');
const lista = document.getElementById('lista');
const mensagem = document.getElementById('mensagem');
const total = document.getElementById('total');

let clientes = [];

// Cria o <li> de um cliente
function criarItem(cliente) {
    const item = document.createElement('li');
    item.innerText = `${cliente.nome} - ${cliente.email}`;

    const botao = document.createElement('button');
    botao.innerText = 'Excluir';
    botao.className = 'excluir';
    botao.addEventListener('click', () => excluir(cliente._id));

    item.appendChild(botao);
    return item;
}

// Busca os clientes e atualiza a tela
async function renderizar() {
    try {
        clientes = await servico.listar();

        lista.innerHTML = '';
        const itens = clientes.map(criarItem);
        itens.forEach(item => lista.appendChild(item));

        total.innerText = `Total de clientes: ${contarClientes(clientes)}`;
    } catch (erro) {
        mensagem.innerText = 'Erro ao listar clientes.';
        console.log(erro);
    }
}

// Cadastra um novo cliente
async function cadastrar() {
    const erros = validarCampos(nomeInput.value, emailInput.value);
    if (erros.length > 0) {
        mensagem.innerText = erros.join(' ');
        return;
    }

    try {
        const cliente = new Cliente(nomeInput.value, emailInput.value);
        await servico.cadastrar(cliente);

        mensagem.innerText = 'Cliente cadastrado com sucesso.';
        nomeInput.value = '';
        emailInput.value = '';
        renderizar();
    } catch (erro) {
        mensagem.innerText = 'Erro ao cadastrar cliente.';
        console.log(erro);
    }
}

// Exclui um cliente pelo id
async function excluir(id) {
    const cliente = buscarPorId(clientes, id);
    if (!cliente) {
        return;
    }

    try {
        await servico.excluir(id);
        renderizar();
    } catch (erro) {
        mensagem.innerText = 'Erro ao excluir cliente.';
        console.log(erro);
    }
}

document.getElementById('cadastrar').addEventListener('click', cadastrar);

renderizar();
