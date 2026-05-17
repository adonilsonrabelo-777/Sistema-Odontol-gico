/* =========================
   LOGIN DO SISTEMA
========================= */

// FORMULÁRIO
const form = document.getElementById("loginForm");

// EVENTO DE LOGIN
form.addEventListener("submit", function(event){

    // IMPEDE RECARREGAR A PÁGINA
    event.preventDefault();

    // CAPTURA USUÁRIO E SENHA
    const usuario = document.getElementById("usuario").value.trim();

    const senha = document.getElementById("senha").value.trim();

    // VALIDAÇÃO SIMPLES
    if(usuario === "admin" && senha === "1234"){

        // MENSAGEM
        alert("Login realizado com sucesso!");

        // REDIRECIONA PARA MENU PRINCIPAL
        window.location.href = "menu-principal.html";

    }else{

        // ERRO
        alert("Usuário ou senha inválidos!");

    }

});