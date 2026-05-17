/* =========================
   DADOS
========================= */

const pacientes = [

    {
        id:1,
        nome:'Maria da Silva',
        cpf:'000.000.000-00',
        telefone:'(00) 00000-0000',
        status:'Ativo',
        nascimento:'10/02/1992',
        endereco:'Rua das Flores, 120',
        bairro:'Centro',
        cidade:'Paranã - TO',

        ultimoAtendimento:'15/05/2026',
        dentista:'Dr. Lucas Andrade',
        procedimento:'Limpeza e profilaxia',
        retorno:'15/06/2026',
        observacoes:'Paciente apresentou leve sensibilidade dentária.'

    },

    {
        id:2,
        nome:'João Pedro Souza',
        cpf:'111.111.111-11',
        telefone:'(11) 11111-1111',
        status:'Ativo',
        nascimento:'22/08/1989',
        endereco:'Av. Principal, 450',
        bairro:'Zona Rural',
        cidade:'Paranã - TO',

        ultimoAtendimento:'11/05/2026',
        dentista:'Dra. Ana Clara',
        procedimento:'Extração dentária',
        retorno:'20/05/2026',
        observacoes:'Paciente em recuperação pós-operatória.'

    },

    {
        id:3,
        nome:'Ana Paula Santos',
        cpf:'222.222.222-22',
        telefone:'(22) 22222-2222',
        status:'Ativo',
        nascimento:'15/05/1995',
        endereco:'Rua Esperança, 78',
        bairro:'Centro',
        cidade:'Paranã - TO',

        ultimoAtendimento:'02/05/2026',
        dentista:'Dr. Lucas Andrade',
        procedimento:'Canal',
        retorno:'30/05/2026',
        observacoes:'Necessita acompanhamento periódico.'

    },

    {
        id:4,
        nome:'Carlos Alberto Lima',
        cpf:'333.333.333-33',
        telefone:'(33) 33333-3333',
        status:'Inativo',
        nascimento:'03/12/1980',
        endereco:'Rua Horizonte, 300',
        bairro:'Zona Rural',
        cidade:'Paranã - TO',

        ultimoAtendimento:'18/03/2026',
        dentista:'Dra. Ana Clara',
        procedimento:'Avaliação odontológica',
        retorno:'Sem retorno agendado',
        observacoes:'Paciente ausente nas últimas consultas.'

    },

    {
        id:5,
        nome:'Fernanda Oliveira',
        cpf:'444.444.444-44',
        telefone:'(44) 44444-4444',
        status:'Ativo',
        nascimento:'09/09/1998',
        endereco:'Rua Bela Vista, 56',
        bairro:'Centro',
        cidade:'Paranã - TO',

        ultimoAtendimento:'10/05/2026',
        dentista:'Dr. Lucas Andrade',
        procedimento:'Clareamento dental',
        retorno:'10/06/2026',
        observacoes:'Paciente satisfeita com resultado inicial.'

    }

];

/* =========================
   PEGAR ID DA URL
========================= */

const params =
new URLSearchParams(
    window.location.search
);

const id =
Number(
    params.get('id')
);

/* =========================
   BUSCAR PACIENTE
========================= */

const paciente =
pacientes.find(
    item => item.id === id
);

/* =========================
   CARREGAR DADOS
========================= */

if(paciente){

    document.getElementById(
        'nomePaciente'
    ).innerText =
    paciente.nome;

    document.getElementById(
        'cpfPaciente'
    ).innerText =
    paciente.cpf;

    document.getElementById(
        'telefonePaciente'
    ).innerText =
    paciente.telefone;

    document.getElementById(
        'nascimentoPaciente'
    ).innerText =
    paciente.nascimento;

    document.getElementById(
        'enderecoPaciente'
    ).innerText =
    paciente.endereco;

    document.getElementById(
        'bairroPaciente'
    ).innerText =
    paciente.bairro;

    document.getElementById(
        'cidadePaciente'
    ).innerText =
    paciente.cidade;

   document.getElementById(
    'ultimoAtendimento'
).innerText =
paciente.ultimoAtendimento;

document.getElementById(
    'dentistaPaciente'
).innerText =
paciente.dentista;

document.getElementById(
    'procedimentoPaciente'
).innerText =
paciente.procedimento;

document.getElementById(
    'retornoPaciente'
).innerText =
paciente.retorno;

    document.getElementById(
        'obsPaciente'
    ).innerText =
    paciente.observacoes;

    const status =
    document.getElementById(
        'statusPaciente'
    );

    status.innerText =
    paciente.status;

    if(paciente.status === 'Inativo'){

        status.classList.remove(
            'ativo'
        );

        status.classList.add(
            'inativo'
        );

    }

}else{

    alert(
        'Paciente não encontrado!'
    );

    window.location.href =
    'pacientes.html';

}

/* =========================
   BOTÃO IMPRIMIR
========================= */

document.querySelector(
    '.btn-imprimir'
).addEventListener(
    'click',
    function(){

        window.print();

    }
);

/* =========================
   BOTÃO EDITAR
========================= */

document.querySelector(
    '.btn-editar'
).addEventListener(
    'click',
    function(){

        alert(
            'Abrir edição do paciente.'
        );

    }
);