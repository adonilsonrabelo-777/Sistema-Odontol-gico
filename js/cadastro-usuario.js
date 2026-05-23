/* =========================
   CADASTRO DE USUÁRIO
========================= */

const cadastroForm =
    document.getElementById("cadastroForm");

const tipoUsuario =
    document.getElementById("tipoUsuario");

const registro =
    document.getElementById("registro");

/* ALTERA PLACEHOLDER */

tipoUsuario.addEventListener("change", function () {

    if (tipoUsuario.value === "dentista") {

        registro.placeholder =
            "Informe o número do CRO";

    } else if (tipoUsuario.value === "atendente") {

        registro.placeholder =
            "Informe o nº do crachá";

    }

});

/* SALVAR CADASTRO */

cadastroForm.addEventListener("submit", function (e) {

    e.preventDefault();

    alert("Cadastro realizado com sucesso!");

    window.location.href =
        "login.html";

});