function adicionarAoCarrinho() {

    let produto = {
        nome: "Gato",
        preco: 20.00,
        quantidade: quantidade
    };

    localStorage.setItem("produtoCarrinho", JSON.stringify(produto));

    alert("Produto adicionado ao carrinho!");
}

let quantidade = 1;

function aumentar() {
    quantidade++;

    document.querySelector("#numero").textContent = quantidade;
}

function diminuir() {
    if (quantidade > 1) {
        quantidade--;

        document.querySelector("#numero").textContent = quantidade;
    }
}