/* =========================
   FORMULÁRIO
========================= */

const form =
document.getElementById(
    'formLaudo'
);

/* =========================
   ENVIAR
========================= */

form.addEventListener(
    'submit',
    function(event){

        event.preventDefault();

        /* CAMPOS */

        const paciente =
        document.getElementById(
            'paciente'
        ).value;

        const data =
        document.getElementById(
            'data'
        ).value;

        const tipo =
        document.getElementById(
            'tipoLaudo'
        ).value;

        const descricao =
        document.getElementById(
            'descricao'
        ).value;

        /* VALIDAÇÃO */

        if(
            paciente === '' ||
            data === '' ||
            tipo === '' ||
            descricao === ''
        ){

            alert(
                'Preencha todos os campos.'
            );

            return;

        }

        /* SUCESSO */

        alert(

            'Laudo salvo com sucesso!'

        );

        /* IMPRESSÃO */

        window.print();

    }
);