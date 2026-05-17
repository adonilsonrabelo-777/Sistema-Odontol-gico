/* =========================
   FORMULÁRIO
========================= */

const form =
document.getElementById(
    'formPaciente'
);

/* =========================
   ENVIAR
========================= */

form.addEventListener(
    'submit',
    function(event){

        event.preventDefault();

        /* CAMPOS */

        const nome =
        document.getElementById(
            'nome'
        ).value;

        const nascimento =
        document.getElementById(
            'nascimento'
        ).value;

        const cpf =
        document.getElementById(
            'cpf'
        ).value;

        const telefone =
        document.getElementById(
            'telefone'
        ).value;

        const endereco =
        document.getElementById(
            'endereco'
        ).value;

        const bairro =
        document.getElementById(
            'bairro'
        ).value;

        const sus =
        document.getElementById(
            'sus'
        ).value;

        const email =
        document.getElementById(
            'email'
        ).value;

        /* VALIDAÇÃO */

        if(
            nome === '' ||
            nascimento === '' ||
            cpf === '' ||
            telefone === '' ||
            endereco === '' ||
            bairro === '' ||
            sus === '' ||
            email === ''
        ){

            alert(
                'Preencha todos os campos obrigatórios.'
            );

            return;

        }

        /* SUCESSO */

        alert(

            'Paciente cadastrado com sucesso!'

        );

        /* LIMPAR FORM */

        form.reset();

    }
);

/* =========================
   MÁSCARA CPF
========================= */

const cpfInput =
document.getElementById(
    'cpf'
);

cpfInput.addEventListener(
    'input',
    function(){

        let valor =
        cpfInput.value.replace(/\D/g,'');

        valor = valor.replace(
            /(\d{3})(\d)/,
            '$1.$2'
        );

        valor = valor.replace(
            /(\d{3})(\d)/,
            '$1.$2'
        );

        valor = valor.replace(
            /(\d{3})(\d{1,2})$/,
            '$1-$2'
        );

        cpfInput.value = valor;

    }
);

/* =========================
   MÁSCARA TELEFONE
========================= */

const telefoneInput =
document.getElementById(
    'telefone'
);

telefoneInput.addEventListener(
    'input',
    function(){

        let valor =
        telefoneInput.value.replace(/\D/g,'');

        valor = valor.replace(
            /^(\d{2})(\d)/g,
            '($1) $2'
        );

        valor = valor.replace(
            /(\d)(\d{4})$/,
            '$1-$2'
        );

        telefoneInput.value = valor;

    }
);