document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PEGAR ID DA URL
    ========================= */

    const params =
    new URLSearchParams(
        window.location.search
    );

    const idAtendimento =
    Number(
        params.get("id")
    );

    /* =========================
       PEGAR LISTA
    ========================= */

    const atendimentos =
    JSON.parse(
        localStorage.getItem(
            "listaAtendimentos"
        )
    ) || [];

    /* =========================
       PROCURAR ATENDIMENTO
    ========================= */

    const atendimento =
    atendimentos.find(item =>
        item.id === idAtendimento
    );

    /* =========================
       NÃO ENCONTRADO
    ========================= */

    if(!atendimento){

        alert(
            "Atendimento não encontrado."
        );

        window.location.href =
        "atendimentos.html";

        return;

    }

    /* =========================
       PREENCHER DADOS
    ========================= */

    document.getElementById(
        "nomePaciente"
    ).textContent =
    atendimento.paciente;

    document.getElementById(
        "cpfPaciente"
    ).textContent =
    atendimento.cpf;

    document.getElementById(
        "telefonePaciente"
    ).textContent =
    atendimento.telefone;

    document.getElementById(
        "idadePaciente"
    ).textContent =
    atendimento.idade;

    document.getElementById(
        "dataAtendimento"
    ).textContent =
    atendimento.data;

    document.getElementById(
        "dentista"
    ).textContent =
    atendimento.dentista;

    /* =========================
       PRIORIDADE
    ========================= */

    const prioridade =
    document.getElementById(
        "prioridade"
    );

    prioridade.textContent =
    atendimento.prioridade;

    prioridade.classList.add(
        atendimento.cor
    );

    /* =========================
       DADOS CLÍNICOS
    ========================= */

    document.getElementById(
        "queixaPrincipal"
    ).textContent =
    atendimento.queixa;

    document.getElementById(
        "procedimentos"
    ).textContent =
    atendimento.procedimentos;

    document.getElementById(
        "observacoes"
    ).textContent =
    atendimento.observacoes;

    /* =========================
       EDITAR
    ========================= */

    document.querySelector(
        ".btn-editar"
    ).addEventListener(
        "click",
        () => {

            alert(
                "Abrir tela de edição."
            );

        }
    );

    /* =========================
       EXCLUIR
    ========================= */

    document.querySelector(
        ".btn-excluir"
    ).addEventListener(
        "click",
        () => {

            const confirmar =
            confirm(
                "Deseja excluir este atendimento?"
            );

            if(confirmar){

                const novaLista =
                atendimentos.filter(item =>
                    item.id !== idAtendimento
                );

                localStorage.setItem(
                    "listaAtendimentos",
                    JSON.stringify(novaLista)
                );

                alert(
                    "Atendimento excluído com sucesso."
                );

                window.location.href =
                "atendimentos.html";

            }

        }
    );

});