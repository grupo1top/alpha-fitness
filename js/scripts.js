const buscaFuncionario = document.querySelector("#buscaFuncionario");
const linhasFuncionarios = document.querySelectorAll("#tabelaFuncionarios tr");
const botoesPaginacao = document.querySelectorAll(".folha-pagination button");
const btnRelatorio = document.querySelector("#btnRelatorio");
const btnProcessar = document.querySelector("#btnProcessar");

if (buscaFuncionario) {
    buscaFuncionario.addEventListener("input", () => {
        const termo = buscaFuncionario.value.toLowerCase().trim();

        linhasFuncionarios.forEach((linha) => {
            const textoLinha = linha.textContent.toLowerCase();
            linha.style.display = textoLinha.includes(termo) ? "" : "none";
        });
    });
}

botoesPaginacao.forEach((botao) => {
    botao.addEventListener("click", () => {
        const numeroPagina = Number(botao.textContent);

        if (!numeroPagina) {
            return;
        }

        botoesPaginacao.forEach((item) => item.classList.remove("active"));
        botao.classList.add("active");
    });
});

if (btnRelatorio) {
    btnRelatorio.addEventListener("click", () => {
        alert("Relatorio da folha gerado.");
    });
}

if (btnProcessar) {
    btnProcessar.addEventListener("click", () => {
        alert("Folha de pagamento processada.");
    });
}
