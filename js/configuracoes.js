// Preencher dados
const conta = JSON.parse(localStorage.getItem('conta'));
if (conta) {
    document.getElementById('fotoConfigConta').src = conta.foto;
    document.getElementById('nomeConfig').value = conta.nome;
    document.getElementById('cpfConfig').value = conta.cpf;
    document.getElementById('nascimentoConfig').value = conta.nascimento;
    document.getElementById('enderecoConfig').value = conta.endereco;
    document.getElementById('emailConfig').value = conta.email;
    document.getElementById('emailRecConfig').value = conta.emailRec;
}

document.getElementById('inputFotoConfig').addEventListener('change', function () {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = e => document.getElementById('fotoConfigConta').src = e.target.result;
        reader.readAsDataURL(this.files[0]);
    }
});

document.getElementById('formConfigConta').onsubmit = function (e) {
    e.preventDefault();

    const nome = document.getElementById('nomeConfig').value.trim();
    const email = document.getElementById('emailConfig').value.trim();
    const emailRec = document.getElementById('emailRecConfig').value.trim();
    const erro = document.getElementById('erroConfigConta');
    erro.textContent = "";

    if (nome.length < 15 || nome.length > 70) {
        erro.textContent = "O nome completo deve ter entre 15 e 70 caracteres.";
        return;
    }

    if (email === emailRec) {
        erro.textContent = "O e-mail de recuperação deve ser diferente do e-mail principal.";
        return;
    }

    localStorage.setItem('conta', JSON.stringify({
        nome,
        email,
        emailRec,
        foto: document.getElementById('fotoConfigConta').src,
        cpf: document.getElementById('cpfConfig').value.trim(),
        nascimento: document.getElementById('nascimentoConfig').value,
        endereco: document.getElementById('enderecoConfig').value.trim()
    }));

    erro.style.color = "#28a745";
    erro.textContent = "Alterações salvas com sucesso!";
};

// Preferências
function aplicarTemaEscuro(ativar) {
    document.body.classList.toggle('modo-escuro', ativar);
}

function aplicarTamanhoFonte(valor) {
    const tamanhos = {
        'normal': '1em',
        'grande': '1.15em',
        'extra-grande': '1.3em'
    };
    document.body.style.fontSize = tamanhos[valor] || '1em';
}

function aplicarLayoutCompacto(ativar) {
    document.body.classList.toggle('layout-compacto', ativar);
}

const temaEscuro = localStorage.getItem('temaEscuro') === 'true';
const notificacoes = localStorage.getItem('notificacoes') === 'true';
const tamanhoFonte = localStorage.getItem('tamanhoFonte') || 'normal';
const layoutCompacto = localStorage.getItem('layoutCompacto') === 'true';
const somNotificacoes = localStorage.getItem('somNotificacoes') === 'true';

document.getElementById('temaEscuro').checked = temaEscuro;
document.getElementById('notificacoes').checked = notificacoes;
document.getElementById('tamanhoFonte').value = tamanhoFonte;
document.getElementById('layoutCompacto').checked = layoutCompacto;
document.getElementById('somNotificacoes').checked = somNotificacoes;

aplicarTemaEscuro(temaEscuro);
aplicarTamanhoFonte(tamanhoFonte);
aplicarLayoutCompacto(layoutCompacto);

document.getElementById('temaEscuro').addEventListener('change', function () {
    localStorage.setItem('temaEscuro', this.checked);
    aplicarTemaEscuro(this.checked);
});

document.getElementById('notificacoes').addEventListener('change', function () {
    localStorage.setItem('notificacoes', this.checked);
    if (this.checked && 'Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Notificações ativadas!', {
                    body: 'Você receberá novidades do site.',
                    icon: document.getElementById('fotoConfigConta').src || ''
                });
            } else {
                alert('Permissão negada.');
                this.checked = false;
                localStorage.setItem('notificacoes', false);
            }
        });
    }
});

document.getElementById('tamanhoFonte').addEventListener('change', function () {
    localStorage.setItem('tamanhoFonte', this.value);
    aplicarTamanhoFonte(this.value);
});

document.getElementById('layoutCompacto').addEventListener('change', function () {
    localStorage.setItem('layoutCompacto', this.checked);
    aplicarLayoutCompacto(this.checked);
});

document.getElementById('somNotificacoes').addEventListener('change', function () {
    localStorage.setItem('somNotificacoes', this.checked);
});
