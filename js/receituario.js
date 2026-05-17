/* =========================
   FORMULÁRIO
========================= */

const form =
document.getElementById(
    'formReceituario'
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

        const prescricao =
        document.getElementById(
            'prescricao'
        ).value;

        const orientacoes =
        document.getElementById(
            'orientacoes'
        ).value;

        /* VALIDAÇÃO */

        if(
            paciente === '' ||
            data === '' ||
            prescricao === ''
        ){

            alert(
                'Preencha os campos obrigatórios.'
            );

            return;

        }

        /* SUCESSO */

        alert(

            'Receituário salvo com sucesso!'

        );

        /* SIMULAR IMPRESSÃO */

        window.print();

    }
);