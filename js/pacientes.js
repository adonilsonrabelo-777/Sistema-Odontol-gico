/* =========================
   DADOS
========================= */

const pacientes = [

    {
        id:1,
        nome:'Maria da Silva',
        cpf:'000.000.000-00',
        telefone:'(00) 00000-0000',
        status:'Ativo'
    },

    {
        id:2,
        nome:'João Pedro Souza',
        cpf:'111.111.111-11',
        telefone:'(11) 11111-1111',
        status:'Ativo'
    },

    {
        id:3,
        nome:'Ana Paula Santos',
        cpf:'222.222.222-22',
        telefone:'(22) 22222-2222',
        status:'Ativo'
    },

    {
        id:4,
        nome:'Carlos Alberto Lima',
        cpf:'333.333.333-33',
        telefone:'(33) 33333-3333',
        status:'Inativo'
    },

    {
        id:5,
        nome:'Fernanda Oliveira',
        cpf:'444.444.444-44',
        telefone:'(44) 44444-4444',
        status:'Ativo'
    }

];

/* =========================
   ELEMENTOS
========================= */

const tbody =
document.getElementById(
    'tbodyPacientes'
);

const busca =
document.getElementById(
    'buscarPaciente'
);

/* =========================
   RENDERIZAR
========================= */

function renderizarPacientes(lista){

    tbody.innerHTML = '';

    lista.forEach((paciente,index)=>{

        const classe =
        paciente.status === 'Ativo'
        ? 'ativo'
        : 'inativo';

        tbody.innerHTML += `

            <tr>

                <td>${paciente.nome}</td>

                <td>${paciente.cpf}</td>

                <td>${paciente.telefone}</td>

                <td>

                    <span class="status ${classe}">

                        ${paciente.status}

                    </span>

                </td>

                <td>

                    <div class="acoes">

                        <!-- VISUALIZAR -->

                        <a
                        href="detalhes-paciente.html?id=${paciente.id}"
                        class="btn-acao visualizar">

                            <i class="fa-regular fa-eye"></i>

                        </a>

                        <!-- EDITAR -->

                        <a
                        href="detalhes-paciente.html?id=${paciente.id}"
                        class="btn-acao editar">

                            <i class="fa-regular fa-pen-to-square"></i>

                        </a>

                        <!-- EXCLUIR -->

                        <button
                        class="btn-acao excluir"
                        onclick="excluir(${index})">

                            <i class="fa-regular fa-trash-can"></i>

                        </button>

                    </div>

                </td>

            </tr>

        `;

    });

}

/* =========================
   BUSCAR
========================= */

busca.addEventListener(
    'keyup',
    function(){

        const texto =
        busca.value.toLowerCase();

        const filtrados =
        pacientes.filter(paciente =>

            paciente.nome
            .toLowerCase()
            .includes(texto)

        );

        renderizarPacientes(
            filtrados
        );

    }
);

/* =========================
   EXCLUIR
========================= */

function excluir(index){

    const confirmar =
    confirm(

        'Deseja excluir este paciente?'

    );

    if(confirmar){

        pacientes.splice(index,1);

        renderizarPacientes(
            pacientes
        );

    }

}

/* =========================
   INICIAR
========================= */

renderizarPacientes(
    pacientes
);