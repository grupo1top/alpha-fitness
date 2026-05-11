const buscaFuncionario = document.querySelector("#buscaFuncionario");
const linhasFuncionarios = document.querySelectorAll("#tabelaFuncionarios tr");
const botoesPaginacao = document.querySelectorAll(".folha-pagination button");
const btnRelatorio = document.querySelector("#btnRelatorio");
const btnProcessar = document.querySelector("#btnProcessar");
const menuIcone = document.querySelector(".menu-icon");
const menuLateral = document.querySelector(".esquerda");
const botoesSair = document.querySelectorAll(".botao-sair, .home-sair");

const tabs = document.querySelectorAll(".aba");
const formSection = document.getElementById("formSection");
const historySection = document.getElementById("historySection");


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

if (menuIcone && menuLateral) {
    menuIcone.addEventListener("click", () => {
        menuLateral.classList.toggle("menu-aberto");
    });
}

botoesSair.forEach((botao) => {
    botao.addEventListener("click", () => {
        window.location.href = "index.html";
    });
});


function activateTab(activeTab) {
	tabs.forEach((tab) => {
		const isActive = tab === activeTab;
		tab.classList.toggle("ativo", isActive);
		tab.setAttribute("aria-selected", String(isActive));
	});
}

tabs.forEach((tab) => {
	tab.addEventListener("click", () => {
		const showHistory = tab.dataset.target === "historySection";

		if (showHistory && !historySection.classList.contains("escondido")) {
			return;
		}

		if (!showHistory && !formSection.classList.contains("escondido")) {
			return;
		}

		activateTab(tab);
		formSection.classList.toggle("escondido", showHistory);
		historySection.classList.toggle("escondido", !showHistory);
	});
});