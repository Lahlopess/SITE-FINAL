let carrinho = [];

function adicionarAoCarrinho() {
    let nome = document.querySelector("h1").textContent ;
    let preco = document.querySelector(".preco").textContent;
    let quant = document.querySelector("#quantidade").textContent;
    
            let produto = {
            nome: nome,
            preco: preco,
            quantidade: quant
            };

carrinho.push(produto);

localStorage.setItem("teste", JSON.stringify(carrinho));

console.log(carrinho);
}

//JSON.stringify - transforma o array em string/texto pra guardar no localStorage