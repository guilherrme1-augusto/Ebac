// Verifica se o e-mail tem um formato válido (função pura)
export function emailValido(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Valida os campos e devolve uma lista de erros (função pura)
export function validarCampos(nome, email) {
    const erros = [];
    if (nome.trim() === '') {
        erros.push('O nome é obrigatório.');
    }
    if (!emailValido(email)) {
        erros.push('Digite um e-mail válido.');
    }
    return erros;
}

// Procura um cliente pelo id usando find (função pura)
export function buscarPorId(clientes, id) {
    return clientes.find(cliente => cliente._id === id);
}

// Conta o total de clientes usando reduce (função pura)
export function contarClientes(clientes) {
    return clientes.reduce(total => total + 1, 0);
}
