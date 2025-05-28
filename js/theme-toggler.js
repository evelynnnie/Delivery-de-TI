// ./js/theme-toggler.js

document.addEventListener('DOMContentLoaded', () => {
    const temaEscuroAtivado = localStorage.getItem('temaEscuro') === 'true';
    if (temaEscuroAtivado) {
        document.body.classList.add('modo-escuro');
    }
});