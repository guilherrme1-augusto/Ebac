// Representa um cliente da aplicação
export class Cliente {
    constructor(nome, email, id = null) {
        this.id = id;
        this.nome = nome;
        this.email = email;
    }
}

// Responsável por conversar com a API (GET, POST, DELETE)
export class ClienteService {
    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async listar() {
        const resposta = await fetch(this.apiUrl);
        return await resposta.json();
    }

    async cadastrar(cliente) {
        const resposta = await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nome: cliente.nome, email: cliente.email })
        });
        return await resposta.json();
    }

    async excluir(id) {
        await fetch(`${this.apiUrl}/${id}`, { method: 'DELETE' });
    }
}
