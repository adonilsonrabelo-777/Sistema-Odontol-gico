/* =========================
   RECUPERAÇÃO DE SENHA
========================= */

// AGUARDA CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", function () {

    // FORMULÁRIO
    const form = document.getElementById("recuperarForm");

    // VERIFICA SE EXISTE
    if (form) {

        form.addEventListener("submit", function (event) {

            // IMPEDE RECARREGAR
            event.preventDefault();

            // CAPTURA EMAIL
            const email = document
                .getElementById("email")
                .value
                .trim();

            // VALIDAÇÃO
            if (email === "") {

                alert("Por favor, informe seu e-mail.");

                return;

            }

            // SIMULA ENVIO
            alert(
                "Um link de recuperação foi enviado para: "
                + email
            );

            // LIMPA CAMPO
            document.getElementById("email").value = "";

            // REDIRECIONA PARA LOGIN
            setTimeout(function () {

                window.location.href = "login.html";

            }, 2000);

        });

    } else {

        console.error(
            "Formulário recuperarForm não encontrado."
        );

    }

});