/* =========================
   DADOS
========================= */

const atendimentos = [

    {
        id:1,
        data:'20/05/2026',
        paciente:'Maria da Silva',
        cpf:'000.000.000-00',
        telefone:'(00) 00000-0000',
        idade:'32 anos',
        dentista:'Dr. Lucas',
        prioridade:'1° Prioridade',
        cor:'vermelho',
        queixa:'Dor intensa no molar inferior.',
        procedimentos:'Limpeza e medicação.',
        observacoes:'Retorno em 7 dias.'
    },

    {
        id:2,
        data:'20/05/2026',
        paciente:'João Pedro Souza',
        cpf:'111.111.111-11',
        telefone:'(11) 11111-1111',
        idade:'35 anos',
        dentista:'Dra. Ana',
        prioridade:'2° Prioridade',
        cor:'amarelo',
        queixa:'Sensibilidade dentária.',
        procedimentos:'Aplicação de flúor.',
        observacoes:'Evitar alimentos gelados.'
    },

    {
        id:3,
        data:'21/05/2026',
        paciente:'Ana Paula Santos',
        cpf:'222.222.222-22',
        telefone:'(22) 22222-2222',
        idade:'29 anos',
        dentista:'Dr. Lucas',
        prioridade:'Pouca Urgência',
        cor:'verde',
        queixa:'Consulta de rotina.',
        procedimentos:'Limpeza completa.',
        observacoes:'Paciente sem alterações.'
    },

    {
        id:4,
        data:'21/05/2026',
        paciente:'Carlos Alberto Lima',
        cpf:'333.333.333-33',
        telefone:'(33) 33333-3333',
        idade:'44 anos',
        dentista:'Dra. Ana',
        prioridade:'Pouca Urgência',
        cor:'verde',
        queixa:'Avaliação odontológica.',
        procedimentos:'Raio-x panorâmico.',
        observacoes:'Necessita retorno.'
    },

    {
        id:5,
        data:'22/05/2026',
        paciente:'Fernanda Oliveira',
        cpf:'444.444.444-44',
        telefone:'(44) 44444-4444',
        idade:'26 anos',
        dentista:'Dr. Lucas',
        prioridade:'1° Prioridade',
        cor:'vermelho',
        queixa:'Dor gengival.',
        procedimentos:'Limpeza e medicação.',
        observacoes:'Retorno em 5 dias.'
    }

];

/* =========================
   LOCAL STORAGE
========================= */

localStorage.setItem(
    "listaAtendimentos",
    JSON.stringify(atendimentos)
);

/* =========================
   ELEMENTOS
========================= */

const tbody =
document.getElementById(
    'tbodyAtendimentos'
);

const filtroDentista =
document.getElementById(
    'filtroDentista'
);

const filtroPrioridade =
document.getElementById(
    'filtroPrioridade'
);

/* =========================
   RENDERIZAR
========================= */

function renderizarAtendimentos(lista){

    tbody.innerHTML = '';

    lista.forEach((item,index)=>{

        tbody.innerHTML += `

            <tr>

                <td>${item.data}</td>

                <td>${item.paciente}</td>

                <td>${item.dentista}</td>

                <td>

                    <span class="tag ${item.cor}">

                        ${item.prioridade}

                    </span>

                </td>

                <td>

                    <div class="acoes">

                        <!-- VISUALIZAR -->

                        <a
                        href="detalhes-atendimento.html?id=${item.id}"
                        class="btn-acao visualizar">

                            <i class="fa-regular fa-eye"></i>

                        </a>

                        <!-- EDITAR -->

                        <a
                        href="detalhes-atendimento.html?id=${item.id}"
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
   PREENCHER FILTROS
========================= */

function carregarFiltros(){

    /* DENTISTAS */

    const dentistas =
    [...new Set(
        atendimentos.map(item =>
            item.dentista
        )
    )];

    dentistas.forEach(dentista => {

        filtroDentista.innerHTML += `

            <option value="${dentista}">

                ${dentista}

            </option>

        `;

    });

    /* PRIORIDADES */

    const prioridades =
    [...new Set(
        atendimentos.map(item =>
            item.prioridade
        )
    )];

    prioridades.forEach(prioridade => {

        filtroPrioridade.innerHTML += `

            <option value="${prioridade}">

                ${prioridade}

            </option>

        `;

    });

}

/* =========================
   FILTRAR
========================= */

function filtrarAtendimentos(){

    const dentistaSelecionado =
    filtroDentista.value;

    const prioridadeSelecionada =
    filtroPrioridade.value;

    const filtrados =
    atendimentos.filter(item => {

        const filtroDentistaOk =
        dentistaSelecionado === '' ||
        item.dentista === dentistaSelecionado;

        const filtroPrioridadeOk =
        prioridadeSelecionada === '' ||
        item.prioridade === prioridadeSelecionada;

        return (
            filtroDentistaOk &&
            filtroPrioridadeOk
        );

    });

    renderizarAtendimentos(
        filtrados
    );

}

/* =========================
   EVENTOS
========================= */

filtroDentista.addEventListener(
    'change',
    filtrarAtendimentos
);

filtroPrioridade.addEventListener(
    'change',
    filtrarAtendimentos
);

/* =========================
   EXCLUIR
========================= */

function excluir(index){

    const confirmar =
    confirm(
        'Deseja excluir este atendimento?'
    );

    if(confirmar){

        atendimentos.splice(index,1);

        localStorage.setItem(
            "listaAtendimentos",
            JSON.stringify(atendimentos)
        );

        filtrarAtendimentos();

    }

}

/* =========================
   INICIAR
========================= */

carregarFiltros();

renderizarAtendimentos(
    atendimentos
);