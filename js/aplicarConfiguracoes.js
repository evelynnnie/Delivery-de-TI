// Aplica configurações do site em todas as páginas

function aplicarConfiguracoesSite() {
    // Tema escuro
    if (localStorage.getItem('temaEscuro') === 'true') {
        document.body.classList.add('modo-escuro');
    } else {
        document.body.classList.remove('modo-escuro');
    }

    // Layout compacto
    if (localStorage.getItem('layoutCompacto') === 'true') {
        document.body.classList.add('layout-compacto');
    } else {
        document.body.classList.remove('layout-compacto');
    }

    // Tamanho da fonte
    const tamanho = localStorage.getItem('tamanhoFonte') || 'normal';
    switch (tamanho) {
        case 'grande':
            document.body.style.fontSize = '1.15em';
            break;
        case 'extra-grande':
            document.body.style.fontSize = '1.3em';
            break;
        default:
            document.body.style.fontSize = '1em';
    }
}

// Execute ao carregar a página
aplicarConfiguracoesSite();