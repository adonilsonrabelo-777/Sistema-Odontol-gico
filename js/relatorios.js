/* =========================
   FORM
========================= */

const form =
    document.getElementById(
        'formRelatorio'
    );

/* =========================
   GERAR RELATÓRIO
========================= */

form.addEventListener(
    'submit',
    function (event) {

        event.preventDefault();

        const tipo =
            document.getElementById(
                'tipoRelatorio'
            ).value;

        const periodo =
            document.getElementById(
                'periodo'
            ).value;

        if (tipo === '') {

            alert(
                'Selecione um relatório.'
            );

            return;

        }

        alert(

            `Relatório gerado:\n\n${tipo}\n${periodo}`

        );

    }
);

/* =========================
   BOTÕES LISTA
========================= */

function gerarRelatorio(nome) {

    alert(

        `Gerando relatório:\n\n${nome}`

    );

}