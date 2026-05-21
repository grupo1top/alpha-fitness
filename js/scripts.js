
// Fuse.js para abrir o menu 
const loadFuse = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/fuse.js@7.0.0';
    script.async = true;
    document.head.appendChild(script);
};


document.addEventListener('DOMContentLoaded', () => {
    loadFuse();

    // Menu Toggle
    const menuIcone = document.querySelector('.menu-icon');
    const menuLateral = document.querySelector('.esquerda');
    if (menuIcone && menuLateral) {
        menuIcone.addEventListener('click', () => {
            menuLateral.classList.toggle('menu-aberto');
        });
    }

    // Logout Buttons
    const botoesSair = document.querySelectorAll('.botao-sair, .home-sair');
    botoesSair.forEach((botao) => {
        botao.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    });

    // Tab Switcher
    const tabs = document.querySelectorAll('.aba');
    const formSection = document.getElementById('formSection');
    const historySection = document.getElementById('historySection');

    function activateTab(activeTab) {
        tabs.forEach((tab) => {
            const isActive = tab === activeTab;
            tab.classList.toggle('ativo', isActive);
            tab.setAttribute('aria-selected', String(isActive));
        });
    }

    tabs.forEach((tab) => {
        tab.addEventListener('click', () => {
            const showHistory = tab.dataset.target === 'historySection';

            if (showHistory && !historySection.classList.contains('escondido')) {
                return;
            }

            if (!showHistory && !formSection.classList.contains('escondido')) {
                return;
            }

            activateTab(tab);
            formSection.classList.toggle('escondido', showHistory);
            historySection.classList.toggle('escondido', !showHistory);
        });
    });

    // Busca em Tabela com Fuse.js
    const buscaFuncionario = document.querySelector('#buscaFuncionario');
    const linhasFuncionarios = document.querySelectorAll('#tabelaFuncionarios tr');

    if (buscaFuncionario && linhasFuncionarios.length > 0) {
        // Preparar dados
        const dados = Array.from(linhasFuncionarios).map((linha) => ({
            elemento: linha,
            texto: linha.textContent.toLowerCase()
        }));

        // Aguardar Fuse.js carregar
        const checkFuse = setInterval(() => {
            if (typeof Fuse !== 'undefined') {
                clearInterval(checkFuse);

                const fuseInstance = new Fuse(dados, {
                    keys: ['texto'],
                    threshold: 0.3
                });

                buscaFuncionario.addEventListener('input', () => {
                    const termo = buscaFuncionario.value.trim();

                    if (!termo) {
                        linhasFuncionarios.forEach((linha) => {
                            linha.style.display = '';
                        });
                        return;
                    }

                    const resultados = fuseInstance.search(termo);
                    const elementosFiltrados = new Set(
                        resultados.map(r => r.item.elemento)
                    );

                    linhasFuncionarios.forEach((linha) => {
                        linha.style.display = elementosFiltrados.has(linha) ? '' : 'none';
                    });
                });
            }
        }, 100);
    }

    // Paginação Customizada
    const botoesPaginacao = document.querySelectorAll('.folha-pagination button');
    botoesPaginacao.forEach((botao) => {
        botao.addEventListener('click', () => {
            const numeroPagina = Number(botao.textContent);

            if (!numeroPagina) {
                return;
            }

            botoesPaginacao.forEach((item) => item.classList.remove('active'));
            botao.classList.add('active');
        });
    });

    // Botões de Ação
    const btnRelatorio = document.querySelector('#btnRelatorio');
    const btnProcessar = document.querySelector('#btnProcessar');

    if (btnRelatorio) {
        btnRelatorio.addEventListener('click', () => {
            alert('Relatorio da folha gerado.');
        });
    }

    if (btnProcessar) {
        btnProcessar.addEventListener('click', () => {
            alert('Folha de pagamento processada.');
        });
    }
});