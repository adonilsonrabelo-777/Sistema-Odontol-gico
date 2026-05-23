/* =========================
   LOGIN DO SISTEMA
========================= */

// FORMULÁRIO
const form = document.getElementById("loginForm");

// EVENTO DE LOGIN
form.addEventListener("submit", function (event) {

    // IMPEDE RECARREGAR
    event.preventDefault();

    // CAPTURA DADOS
    const usuario = document
        .getElementById("usuario")
        .value
        .trim();

    const senha = document
        .getElementById("senha")
        .value
        .trim();

    // LOGIN
    if (usuario === "admin" && senha === "1234") {

        alert("Login realizado com sucesso!");

        window.location.href =
            "menu-principal.html";

    } else {

        alert("Usuário ou senha inválidos!");

    }

});