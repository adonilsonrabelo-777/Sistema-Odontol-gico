/* =========================
   PRIORIDADE
========================= */

let prioridadeSelecionada = '';

function selecionarPrioridade(prioridade){

    prioridadeSelecionada = prioridade;

    const cards =
    document.querySelectorAll(
        '.card-prioridade'
    );

    cards.forEach(card=>{

        card.classList.remove(
            'selecionado'
        );

    });

    event.currentTarget.classList.add(
        'selecionado'
    );

}

/* =========================
   FORMULÁRIO
========================= */

const form =
document.getElementById(
    'formAtendimento'
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

        const dentista =
        document.getElementById(
            'dentista'
        ).value;

        const queixa =
        document.getElementById(
            'queixa'
        ).value;

        /* VALIDAÇÃO */

        if(
            paciente === '' ||
            data === '' ||
            dentista === '' ||
            prioridadeSelecionada === '' ||
            queixa === ''
        ){

            alert(
                'Preencha todos os campos.'
            );

            return;

        }

        /* SUCESSO */

        alert(

            'Atendimento cadastrado com sucesso!'

        );

        form.reset();

        prioridadeSelecionada = '';

        document
        .querySelectorAll(
            '.card-prioridade'
        )
        .forEach(card=>{

            card.classList.remove(
                'selecionado'
            );

        });

    }
);