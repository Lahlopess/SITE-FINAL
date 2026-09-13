
let carrinho = [];

let carrinhoSalvo = localStorage.getItem("carrinho");

if (carrinhoSalvo != null) {

    carrinho = JSON.parse(carrinhoSalvo);

}


function adicionarAoCarrinho() {

    // PEGA AS INFORMAÇÕES DO PRODUTO

    let nome = document.querySelector("h1").textContent;

    let preco = document.querySelector(".preco").textContent;

    let descricao = document.querySelector(".descricao").textContent;

    let imagem = document.querySelector(".imagem-produto img").getAttribute("src");

    let quant = document.querySelector("#numero").textContent;


    // TRANSFORMA O PREÇO EM NÚMERO

    // Exemplo: "R$ 20,00" vira 20

    preco = preco.replace("R$", "");

    preco = preco.replace(",", ".");

    preco = Number(preco);


    // TRANSFORMA A QUANTIDADE EM NÚMERO

    quant = Number(quant);


    // CRIA O PRODUTO

    let produto = {

        nome: nome,

        preco: preco,

        quantidade: quant,

        descricao: descricao,

        imagem: imagem

    };


    // ADICIONA O PRODUTO AO CARRINHO

    carrinho.push(produto);


    // SALVA O CARRINHO

    localStorage.setItem("carrinho", JSON.stringify(carrinho));


    console.log(carrinho);

    alert("Produto adicionado ao carrinho!");

}



// QUANTIDADE DE PRODUTOS

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

// quantidade inicia em 1.
// Apertando no botão +, adiciona 1 à quantidade.
// Apertando no botão -, diminui 1, mas nunca fica menor que 1.



// TEMA

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



// IDIOMA

let idioma = document.querySelector("#idioma-select");

function traduzir() {

    let textos = document.querySelectorAll("[data-pt]");

    for (let i = 0; i < textos.length; i++) {

        // passe por todos os elementos que possuem data-pt

        if (textos[i] == botaoTema) {

            // esse elemento é o botão tema?

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

            // se não for o botão tema, traduz o texto

            if (idioma.value == "en") {

                textos[i].textContent = textos[i].getAttribute("data-en");

            } else {

                textos[i].textContent = textos[i].getAttribute("data-pt");

            }

        }

    }

    // guarda o idioma escolhido

    localStorage.setItem("idioma", idioma.value);

}



// CONTROLES DA PÁGINA INICIAL

if (botaoTema != null) {

    botaoTema.onclick = mudarTema;

}

if (idioma != null) {

    idioma.onchange = traduzir;

}



// CARREGAR O TEMA E O IDIOMA SALVOS

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


// mostra todos os produtos do carrinho

if (document.querySelector(".pagina-carrinho") != null) {

    mostrarCarrinho();

}


// cria os produtos dentro do carrinho

function mostrarCarrinho() {

    let lista = document.querySelector("#lista-carrinho");

    lista.innerHTML = "";


    if (carrinho.length == 0) {

        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";

    } else {

        for (let i = 0; i < carrinho.length; i++) {

            let produto = carrinho[i];

            let item = document.createElement("div");

            item.className = "item-carrinho";


            item.innerHTML = `

                <input type="checkbox" class="selecionar-produto">


                <img src="${produto.imagem}">


                <div class="informacoes-carrinho">

                    <h2>${produto.nome}</h2>

                    <p>${produto.descricao}</p>


                    <div class="quantidade-carrinho">

                        <button onclick="diminuirCarrinho(${i})">−</button>

                        <span>${produto.quantidade}</span>

                        <button onclick="aumentarCarrinho(${i})">+</button>

                    </div>

                </div>


                <strong class="preco-carrinho">

                    R$ ${(produto.preco * produto.quantidade).toFixed(2).replace(".", ",")}

                </strong>


                <button onclick="removerDoCarrinho(${i})">

                    🗑️

                </button>

            `;


            lista.appendChild(item);

        }

    }


    atualizarTotal();

}



// AUMENTAR QUANTIDADE NO CARRINHO

function aumentarCarrinho(indice) {

    carrinho[indice].quantidade++;

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarCarrinho();

}



// DIMINUIR QUANTIDADE NO CARRINHO

function diminuirCarrinho(indice) {

    if (carrinho[indice].quantidade > 1) {

        carrinho[indice].quantidade--;

        localStorage.setItem("carrinho", JSON.stringify(carrinho));

        mostrarCarrinho();

    }

}



// REMOVER PRODUTO DO CARRINHO

function removerDoCarrinho(indice) {

    carrinho.splice(indice, 1);

    localStorage.setItem("carrinho", JSON.stringify(carrinho));

    mostrarCarrinho();

}



// CALCULAR O TOTAL

function atualizarTotal() {

    let total = 0;


    for (let i = 0; i < carrinho.length; i++) {

        total = total + (carrinho[i].preco * carrinho[i].quantidade);

    }


    document.querySelector("#total").textContent =

        "R$ " + total.toFixed(2).replace(".", ",");

}



// SELECIONAR TODOS OS PRODUTOS

let todos = document.querySelector("#todos");

if (todos != null) {

    todos.onclick = function() {

        let produtos = document.querySelectorAll(".selecionar-produto");


        for (let i = 0; i < produtos.length; i++) {

            produtos[i].checked = todos.checked;

        }

    };

}



// FINALIZAR COMPRA

function finalizarCompra() {

    alert("Compra finalizada!");

}
