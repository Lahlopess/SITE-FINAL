let carrinho = [];

function adicionarAoCarrinho() {

    let nome = document.querySelector("h1").textContent;
    let preco = document.querySelector(".preco").textContent;
    let quant = document.querySelector("#numero").textContent;
    let produto = {
        nome: nome,
        preco: preco,
        quantidade: quant
    };

    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
// localStorage é a memória do navegador.
// O localStorage guarda texto, mas o produto aqui é um objeto,
// então com JSON.stringify() o objeto vira texto para poder guardar no localStorage.
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
// se o botao existir, ele funciona
// *NO NOSSO CASO, não temos btn-tema nem idioma nos HTML dos produtos, mas precisamos falar pro js
// "se não existir botão, não tenta usar ele, só continua o código"

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