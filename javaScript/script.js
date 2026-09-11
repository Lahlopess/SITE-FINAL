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

let botaoTema = document.querySelector("#btn-tema");

function mudarTema() {

    if (document.documentElement.getAttribute("data-theme") == "dark") {

        document.documentElement.removeAttribute("data-theme");

        if (idioma.value == "en") {
            botaoTema.textContent = "🌑 Dark Mode";
        } else {
            botaoTema.textContent = "🌑 Modo Escuro";
        }
        //se o tema atual for dark, remova o atributo data-theme e mude o texto do botão para "🌑 Dark Mode"
        // ou "🌑 Modo Escuro" dependendo do idioma selecionado *EXATAMENTE O MESMO COM MODO CLARO

    } else {

        document.documentElement.setAttribute("data-theme", "dark");

        if (idioma.value == "en") {
            botaoTema.textContent = "☀️ Light Mode";
        } else {
            botaoTema.textContent = "☀️ Modo Claro";
        }
    }
}


botaoTema.onclick = mudarTema;

let idioma = document.querySelector("#idioma-select");
idioma.onchange = traduzir;
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
}