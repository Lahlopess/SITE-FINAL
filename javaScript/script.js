let carrinho = [];

let carrinhoSalvo = localStorage.getItem("carrinho");

if (carrinhoSalvo != null) {
carrinho = JSON.parse(carrinhoSalvo);
}

// ==================================================
// ADICIONAR AO CARRINHO
// ==================================================

function adicionarAoCarrinho() {

// PEGA AS INFORMAÇÕES DO PRODUTO

let nome = document.querySelector("h1");
let preco = document.querySelector(".preco").textContent;
let descricao = document.querySelector(".descricao");
let imagem = document.querySelector(".imagem-produto img").getAttribute("src");
let quant = document.querySelector("#numero").textContent;


// PEGA O NOME EM PORTUGUÊS E EM INGLÊS

let nomePt = nome.getAttribute("data-pt");
let nomeEn = nome.getAttribute("data-en");


// PEGA A DESCRIÇÃO EM PORTUGUÊS E EM INGLÊS

let descricaoPt = descricao.getAttribute("data-pt");
let descricaoEn = descricao.getAttribute("data-en");


// TRANSFORMA O PREÇO EM NÚMERO

preco = preco.replace("R$", "");
preco = preco.replace(",", ".");
preco = Number(preco);


// TRANSFORMA A QUANTIDADE EM NÚMERO

quant = Number(quant);


// VERIFICA SE O PRODUTO JÁ EXISTE

let produtoExiste = false;

for (let i = 0; i < carrinho.length; i++) {

    if (carrinho[i].nomePt == nomePt || carrinho[i].nome == nomePt) {

        carrinho[i].quantidade = carrinho[i].quantidade + quant;

        carrinho[i].nomePt = nomePt;
        carrinho[i].nomeEn = nomeEn;
        carrinho[i].descricaoPt = descricaoPt;
        carrinho[i].descricaoEn = descricaoEn;
        carrinho[i].preco = preco;
        carrinho[i].imagem = imagem;

        produtoExiste = true;
    }
}


// SE NÃO EXISTE, CRIA UM NOVO PRODUTO

if (produtoExiste == false) {

    let produto = {

        nomePt: nomePt,
        nomeEn: nomeEn,
        preco: preco,
        quantidade: quant,
        descricaoPt: descricaoPt,
        descricaoEn: descricaoEn,
        imagem: imagem

    };

    carrinho.push(produto);
}


// SALVA O CARRINHO

localStorage.setItem("carrinho", JSON.stringify(carrinho));

alert("Produto adicionado ao carrinho!");

}

// ==================================================
// QUANTIDADE DO PRODUTO
// ==================================================

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

// ==================================================
// TEMA
// ==================================================

let botaoTema = document.querySelector("#btn-tema");

function mudarTema() {

if (document.documentElement.getAttribute("data-theme") == "dark") {

    // se estiver escuro, volta para o claro

    document.documentElement.removeAttribute("data-theme");

    localStorage.setItem("tema", "claro");

    if (idioma.value == "en") {

        botaoTema.textContent = "🌑 Dark Mode";

    } else {

        botaoTema.textContent = "🌑 Modo Escuro";

    }

} else {

    // se estiver claro, vai para o escuro

    document.documentElement.setAttribute("data-theme", "dark");

    localStorage.setItem("tema", "dark");

    if (idioma.value == "en") {

        botaoTema.textContent = "☀️ Light Mode";

    } else {

        botaoTema.textContent = "☀️ Modo Claro";

    }
}

}

// ==================================================
// IDIOMA
// ==================================================

let idioma = document.querySelector("#idioma-select");

function traduzir() {

let textos = document.querySelectorAll("[data-pt]");

for (let i = 0; i < textos.length; i++) {

    if (textos[i] == botaoTema) {

        if (document.documentElement.getAttribute("data-theme") == "dark") {

            if (idioma.value == "en") {

                botaoTema.textContent = "☀️ Light Mode";

            } else {

                botaoTema.textContent = "☀️ Modo Claro";

            }

        } else {

            if (idioma.value == "en") {

                botaoTema.textContent = "🌑 Dark Mode";

            } else {

                botaoTema.textContent = "🌑 Modo Escuro";

            }
        }

    } else {

        if (idioma.value == "en") {

            textos[i].textContent = textos[i].getAttribute("data-en");

        } else {

            textos[i].textContent = textos[i].getAttribute("data-pt");

        }
    }
}


// guarda o idioma escolhido

localStorage.setItem("idioma", idioma.value);


// atualiza o carrinho

if (document.querySelector(".pagina-carrinho") != null) {

    mostrarCarrinho();
}

}

// ==================================================
// CONTROLES DA PÁGINA
// ==================================================

if (botaoTema != null) {

botaoTema.onclick = mudarTema;

}

if (idioma != null) {

idioma.onchange = traduzir;

}

// ==================================================
// CARREGAR TEMA E IDIOMA SALVOS
// ==================================================

let temaSalvo = localStorage.getItem("tema");

let idiomaSalvo = localStorage.getItem("idioma");

// aplica o tema salvo

if (temaSalvo == "dark") {

document.documentElement.setAttribute("data-theme", "dark");

} else {

document.documentElement.removeAttribute("data-theme");

}

// aplica o idioma salvo

if (idiomaSalvo == "en") {

let textos = document.querySelectorAll("[data-pt]");

for (let i = 0; i < textos.length; i++) {

    if (textos[i] == botaoTema) {

        if (temaSalvo == "dark") {

            textos[i].textContent = "☀️ Light Mode";

        } else {

            textos[i].textContent = "🌑 Dark Mode";

        }

    } else {

        textos[i].textContent = textos[i].getAttribute("data-en");
    }
}

} else {

let textos = document.querySelectorAll("[data-pt]");

for (let i = 0; i < textos.length; i++) {

    if (textos[i] == botaoTema) {

        if (temaSalvo == "dark") {

            textos[i].textContent = "☀️ Modo Claro";

        } else {

            textos[i].textContent = "🌑 Modo Escuro";

        }

    } else {

        textos[i].textContent = textos[i].getAttribute("data-pt");
    }
}

}

// deixa o select mostrando o idioma salvo

if (idioma != null) {

if (idiomaSalvo == "en") {

    idioma.value = "en";

} else {

    idioma.value = "pt";
}

}

// ==================================================
// CARRINHO
// ==================================================

if (document.querySelector(".pagina-carrinho") != null) {

mostrarCarrinho();

}

// ==================================================
// MOSTRAR PRODUTOS DO CARRINHO
// ==================================================

function mostrarCarrinho() {

let lista = document.querySelector("#lista-carrinho");

lista.innerHTML = "";


// SE O CARRINHO ESTIVER VAZIO

if (carrinho.length == 0) {

    if (idioma.value == "en") {

        lista.innerHTML = "<p>Your cart is empty.</p>";

    } else {

        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
    }

} else {

    // PASSA POR TODOS OS PRODUTOS

    for (let i = 0; i < carrinho.length; i++) {

        let produto = carrinho[i];


        // ESCOLHE O IDIOMA DO PRODUTO

        let nomeProduto;
        let descricaoProduto;


        if (idioma.value == "en") {

            nomeProduto = produto.nomeEn;
            descricaoProduto = produto.descricaoEn;

        } else {

            nomeProduto = produto.nomePt;
            descricaoProduto = produto.descricaoPt;
        }


        // CRIA A CAIXA DO PRODUTO

        let item = document.createElement("div");

        item.className = "item-carrinho";


        // COLOCA AS INFORMAÇÕES DO PRODUTO

        item.innerHTML = `

            <input type="checkbox" class="selecionar-produto">

            <img src="${produto.imagem}" alt="${nomeProduto}">

            <div class="informacoes-carrinho">

                <h2>${nomeProduto}</h2>

                <p>${descricaoProduto}</p>

                <div class="quantidade-carrinho">

                    <button type="button" onclick="diminuirCarrinho(${i})">
                        −
                    </button>

                    <span>${produto.quantidade}</span>

                    <button type="button" onclick="aumentarCarrinho(${i})">
                        +
                    </button>

                </div>

            </div>

            <strong class="preco-carrinho">

                R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}

            </strong>

            <button type="button" onclick="removerDoCarrinho(${i})">

                🗑️

            </button>

        `;


        // COLOCA O PRODUTO NA LISTA

        lista.appendChild(item);


        // PEGA O CHECKBOX DESSE PRODUTO

        let checkbox = item.querySelector(".selecionar-produto");


        // QUANDO MARCAR OU DESMARCAR,
        // ATUALIZA O TOTAL

        checkbox.onclick = function() {

            atualizarTotal();

        };

    }
}


// ATUALIZA O TOTAL

atualizarTotal();

}

// ==================================================
// AUMENTAR QUANTIDADE NO CARRINHO
// ==================================================

function aumentarCarrinho(indice) {

carrinho[indice].quantidade++;

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

// ==================================================
// DIMINUIR QUANTIDADE NO CARRINHO
// ==================================================

function diminuirCarrinho(indice) {

if (carrinho[indice].quantidade > 1) {

    carrinho[indice].quantidade--;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarCarrinho();
}

}

// ==================================================
// REMOVER UM PRODUTO
// ==================================================

function removerDoCarrinho(indice) {

carrinho.splice(indice, 1);

localStorage.setItem("carrinho", JSON.stringify(carrinho));

mostrarCarrinho();

}

// ==================================================
// REMOVER TODOS OS PRODUTOS
// ==================================================

function removerTodos() {

carrinho = [];

localStorage.removeItem("carrinho");

mostrarCarrinho();

}

// ==================================================
// CALCULAR O TOTAL
// ==================================================
function atualizarTotal() {
let total = 0;

let produtos = document.querySelectorAll(".selecionar-produto");


// passa por todos os produtos

for (let i = 0; i < produtos.length; i++) {

    // verifica se o produto está selecionado

    if (produtos[i].checked) {

        total = total + (carrinho[i].preco * carrinho[i].quantidade);

    }
}


document.querySelector("#total").textContent =
    "R$ " + total.toFixed(2).replace(".", ",");

}
// ==================================================
// SELECIONAR TODOS
// ==================================================

let todos = document.querySelector("#todos");

if (todos != null) {

todos.onclick = function() {

    let produtos = document.querySelectorAll(".selecionar-produto");

    for (let i = 0; i < produtos.length; i++) {

        produtos[i].checked = todos.checked;
    }

    atualizarTotal();
};

}
// ==================================================
// FINALIZAR COMPRA
// ==================================================

function finalizarCompra() {
let produtos = document.querySelectorAll(".selecionar-produto");

let algumSelecionado = false;


// verifica quais produtos estão selecionados

for (let i = produtos.length - 1; i >= 0; i--) {

    if (produtos[i].checked) {

        carrinho.splice(i, 1);

        algumSelecionado = true;
    }
}


// se nenhum produto foi selecionado

if (algumSelecionado == false) {

    alert("Selecione pelo menos um produto.");

    return;
}


// salva o carrinho atualizado

localStorage.setItem("carrinho", JSON.stringify(carrinho));


// mostra o carrinho novamente

mostrarCarrinho();


alert("Compra finalizada!");
}
// BARRA DE PESQUISA
const pesquisa = document.getElementById("pesquisa");
const botaoPesquisa = document.getElementById("btn-pesquisa");
const cards = document.querySelectorAll(".caixa");

function pesquisarProdutos() {

    const texto = pesquisa.value.toLowerCase().trim();

    cards.forEach(function(card) {

        const nomeProduto = card
            .querySelector(".card-tag")
            .textContent
            .toLowerCase();

        if (nomeProduto.includes(texto)) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });
}

if (pesquisa != null && botaoPesquisa != null) {

    botaoPesquisa.addEventListener("click", pesquisarProdutos);

    pesquisa.addEventListener("input", pesquisarProdutos);

}
