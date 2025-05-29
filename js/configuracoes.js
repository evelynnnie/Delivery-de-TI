// Preencher dados
const conta = JSON.parse(localStorage.getItem("conta"));
if (conta) {
  document.getElementById("fotoConfigConta").src = conta.foto;
  document.getElementById("nomeConfig").value = conta.nome;
  document.getElementById("cpfConfig").value = conta.cpf;
  document.getElementById("nascimentoConfig").value = conta.nascimento;
  document.getElementById("enderecoConfig").value = conta.endereco;
  document.getElementById("emailConfig").value = conta.email;
  document.getElementById("emailRecConfig").value = conta.emailRec;
}

document
  .getElementById("inputFotoConfig")
  .addEventListener("change", function () {
    if (this.files && this.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) =>
        (document.getElementById("fotoConfigConta").src = e.target.result);
      reader.readAsDataURL(this.files[0]);
    }
  });

document.getElementById("formConfigConta").onsubmit = function (e) {
  e.preventDefault();

  const nome = document.getElementById("nomeConfig").value.trim();
  const email = document.getElementById("emailConfig").value.trim();
  const emailRec = document.getElementById("emailRecConfig").value.trim();
  const erro = document.getElementById("erroConfigConta");
  erro.textContent = "";

  if (nome.length < 15 || nome.length > 70) {
    erro.textContent = "O nome completo deve ter entre 15 e 70 caracteres.";
    return;
  }

  if (email === emailRec) {
    erro.textContent =
      "O e-mail de recuperação deve ser diferente do e-mail principal.";
    return;
  }

  localStorage.setItem(
    "conta",
    JSON.stringify({
      nome,
      email,
      emailRec,
      foto: document.getElementById("fotoConfigConta").src,
      cpf: document.getElementById("cpfConfig").value.trim(),
      nascimento: document.getElementById("nascimentoConfig").value,
      endereco: document.getElementById("enderecoConfig").value.trim(),
    })
  );

  erro.style.color = "#28a745";
  erro.textContent = "Alterações salvas com sucesso!";
};

// Preferências
function aplicarTemaEscuro(ativar) {
  document.body.classList.toggle("modo-escuro", ativar);
}

function aplicarTamanhoFonte(valor) {
  const tamanhos = {
    normal: "1em",
    grande: "1.15em",
    "extra-grande": "1.3em",
  };
  document.body.style.fontSize = tamanhos[valor] || "1em";
}

function aplicarLayoutCompacto(ativar) {
  document.body.classList.toggle("layout-compacto", ativar);
}

const temaEscuro = localStorage.getItem("temaEscuro") === "true";
const notificacoes = localStorage.getItem("notificacoes") === "true";
const tamanhoFonte = localStorage.getItem("tamanhoFonte") || "normal";
const layoutCompacto = localStorage.getItem("layoutCompacto") === "true";
const somNotificacoes = localStorage.getItem("somNotificacoes") === "true";

document.getElementById("temaEscuro").checked = temaEscuro;
document.getElementById("notificacoes").checked = notificacoes;
document.getElementById("tamanhoFonte").value = tamanhoFonte;
document.getElementById("layoutCompacto").checked = layoutCompacto;
document.getElementById("somNotificacoes").checked = somNotificacoes;

aplicarTemaEscuro(temaEscuro);
aplicarTamanhoFonte(tamanhoFonte);
aplicarLayoutCompacto(layoutCompacto);

document.getElementById("temaEscuro").addEventListener("change", function () {
  localStorage.setItem("temaEscuro", this.checked);
  aplicarTemaEscuro(this.checked);
});

document.getElementById("notificacoes").addEventListener("change", function () {
  localStorage.setItem("notificacoes", this.checked);
  if (this.checked && "Notification" in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification("Notificações ativadas!", {
          body: "Você receberá novidades do site.",
          icon: document.getElementById("fotoConfigConta").src || "",
        });
      } else {
        alert("Permissão negada.");
        this.checked = false;
        localStorage.setItem("notificacoes", false);
      }
    });
  }
});

document.getElementById("tamanhoFonte").addEventListener("change", function () {
  localStorage.setItem("tamanhoFonte", this.value);
  aplicarTamanhoFonte(this.value);
});

document
  .getElementById("layoutCompacto")
  .addEventListener("change", function () {
    localStorage.setItem("layoutCompacto", this.checked);
    aplicarLayoutCompacto(this.checked);
  });

document
  .getElementById("somNotificacoes")
  .addEventListener("change", function () {
    localStorage.setItem("somNotificacoes", this.checked);
  });

// ./js/configuracoes.js

document.addEventListener("DOMContentLoaded", () => {
  const temaEscuroToggle = document.getElementById("temaEscuro");

  // 1. Carrega o estado inicial do toggle com base no localStorage ao carregar a página de configurações
  const temaEscuroAtivado = localStorage.getItem("temaEscuro") === "true";
  temaEscuroToggle.checked = temaEscuroAtivado; // Define o estado do checkbox

  // 2. Adiciona um listener para quando o estado do checkbox muda
  temaEscuroToggle.addEventListener("change", () => {
    if (temaEscuroToggle.checked) {
      // Se o checkbox está marcado (modo escuro ativado)
      document.body.classList.add("modo-escuro");
      localStorage.setItem("temaEscuro", "true"); // Salva a preferência como 'true'
    } else {
      // Se o checkbox está desmarcado (modo claro ativado)
      document.body.classList.remove("modo-escuro");
      localStorage.setItem("temaEscuro", "false"); // Salva a preferência como 'false'
    }
  });

  // --- Seu código existente para outras configurações em configuracoes.js (ex: foto, nome, etc.) deve vir aqui ---

  // Exemplo: Lógica para o campo de CPF
  const cpfInput = document.getElementById("cpfConfig");
  if (cpfInput) {
    cpfInput.addEventListener("input", (event) => {
      let value = event.target.value.replace(/\D/g, ""); // Remove tudo que não é dígito
      if (value.length > 3)
        value = value.substring(0, 3) + "." + value.substring(3);
      if (value.length > 7)
        value = value.substring(0, 7) + "." + value.substring(7);
      if (value.length > 11)
        value = value.substring(0, 11) + "-" + value.substring(11, 14);
      event.target.value = value;
    });
  }

  // Exemplo: Lógica para o campo de foto
  const fotoConfigConta = document.getElementById("fotoConfigConta");
  const inputFotoConfig = document.getElementById("inputFotoConfig");

  // Carregar a foto salva, se houver
  const savedPhoto = localStorage.getItem("userPhoto");
  if (savedPhoto) {
    fotoConfigConta.src = savedPhoto;
  } else {
    // Defina uma imagem padrão se não houver foto salva
    fotoConfigConta.src = "../src/imagens/fotopadrao.jpg"; // SUBSTITUA PELO CAMINHO REAL DA SUA FOTO PADRÃO
  }

  inputFotoConfig.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        fotoConfigConta.src = e.target.result;
        localStorage.setItem("userPhoto", e.target.result); // Salva a foto no localStorage
      };
      reader.readAsDataURL(file);
    }
  });

  // Lógica de salvar alterações do formulário
  const formConfigConta = document.getElementById("formConfigConta");
  if (formConfigConta) {
    formConfigConta.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("nomeConfig").value;
      const cpf = document.getElementById("cpfConfig").value;
      const nascimento = document.getElementById("nascimentoConfig").value;
      const endereco = document.getElementById("enderecoConfig").value;
      const email = document.getElementById("emailConfig").value;
      const emailRec = document.getElementById("emailRecConfig").value;
      const erroDiv = document.getElementById("erroConfigConta");

      if (nome.length < 15) {
        erroDiv.textContent = "Nome deve ter no mínimo 15 caracteres.";
        return;
      }
      // Adicione outras validações se necessário

      localStorage.setItem("nomeUsuario", nome);
      localStorage.setItem("cpfUsuario", cpf);
      localStorage.setItem("nascimentoUsuario", nascimento);
      localStorage.setItem("enderecoUsuario", endereco);
      localStorage.setItem("emailUsuario", email);
      localStorage.setItem("emailRecuperacaoUsuario", emailRec);

      erroDiv.textContent = "Alterações salvas com sucesso!";
      erroDiv.style.color = "#4CAF50"; // Cor verde para sucesso
      setTimeout(() => {
        erroDiv.textContent = "";
        erroDiv.style.color = "#d32f2f"; // Volta para a cor de erro padrão
      }, 3000);
    });

    // Carregar dados salvos ao carregar a página
    document.getElementById("nomeConfig").value =
      localStorage.getItem("nomeUsuario") || "";
    document.getElementById("cpfConfig").value =
      localStorage.getItem("cpfUsuario") || "";
    document.getElementById("nascimentoConfig").value =
      localStorage.getItem("nascimentoUsuario") || "";
    document.getElementById("enderecoConfig").value =
      localStorage.getItem("enderecoUsuario") || "";
    document.getElementById("emailConfig").value =
      localStorage.getItem("emailUsuario") || "";
    document.getElementById("emailRecConfig").value =
      localStorage.getItem("emailRecuperacaoUsuario") || "";
  }

  // Lógica para tamanho da fonte (se precisar salvar em localStorage)
  const tamanhoFonteSelect = document.getElementById("tamanhoFonte");
  if (tamanhoFonteSelect) {
    // Carregar preferência de tamanho de fonte
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      tamanhoFonteSelect.value = savedFontSize;
      document.body.style.fontSize =
        savedFontSize === "grande"
          ? "1.1em"
          : savedFontSize === "extra-grande"
          ? "1.25em"
          : "1em";
    }

    tamanhoFonteSelect.addEventListener("change", (event) => {
      const selectedSize = event.target.value;
      localStorage.setItem("fontSize", selectedSize);
      if (selectedSize === "grande") {
        document.body.style.fontSize = "1.1em";
      } else if (selectedSize === "extra-grande") {
        document.body.style.fontSize = "1.25em";
      } else {
        document.body.style.fontSize = "1em";
      }
    });
  }

  // Lógica para layout compacto (se precisar salvar em localStorage)
  const layoutCompactoToggle = document.getElementById("layoutCompacto");
  if (layoutCompactoToggle) {
    const layoutCompactoAtivado =
      localStorage.getItem("layoutCompacto") === "true";
    layoutCompactoToggle.checked = layoutCompactoAtivado;
    if (layoutCompactoAtivado) {
      document.body.classList.add("layout-compacto");
    }

    layoutCompactoToggle.addEventListener("change", () => {
      if (layoutCompactoToggle.checked) {
        document.body.classList.add("layout-compacto");
        localStorage.setItem("layoutCompacto", "true");
      } else {
        document.body.classList.remove("layout-compacto");
        localStorage.setItem("layoutCompacto", "false");
      }
    });
  }

  // Lógica para notificações e som de notificações (se precisar salvar em localStorage)
  const notificacoesToggle = document.getElementById("notificacoes");
  if (notificacoesToggle) {
    const notificacoesAtivadas =
      localStorage.getItem("notificacoes") === "true";
    notificacoesToggle.checked = notificacoesAtivadas;
    notificacoesToggle.addEventListener("change", () => {
      localStorage.setItem("notificacoes", notificacoesToggle.checked);
    });
  }

  const somNotificacoesToggle = document.getElementById("somNotificacoes");
  if (somNotificacoesToggle) {
    const somNotificacoesAtivado =
      localStorage.getItem("somNotificacoes") === "true";
    somNotificacoesToggle.checked = somNotificacoesAtivado;
    somNotificacoesToggle.addEventListener("change", () => {
      localStorage.setItem("somNotificacoes", somNotificacoesToggle.checked);
    });
  }
});
