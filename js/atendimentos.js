/* =========================
   ESTADO GLOBAL (DADOS DO BANCO)
========================= */
let atendimentos = [];

/* =========================
   ELEMENTOS
========================= */
const tbody = document.getElementById('tbodyAtendimentos');
const filtroDentista = document.getElementById('filtroDentista');
const filtroPrioridade = document.getElementById('filtroPrioridade');

/* =========================
   INICIAR E BUSCAR DADOS
========================= */
document.addEventListener("DOMContentLoaded", () => {
    carregarAtendimentosDoServidor();
});

async function carregarAtendimentosDoServidor() {
    try {
        const response = await fetch('http://localhost:3000/api/atendimentos');
        if (!response.ok) throw new Error('Não foi possível buscar a lista de atendimentos');
        
        atendimentos = await response.json();
        
        carregarFiltros();
        renderizarAtendimentos(atendimentos);
    } catch (error) {
        console.error('Erro:', error);
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center; color:red;">Erro ao carregar dados do servidor.</td></tr>`;
    }
}

/* =========================
   RENDERIZAR
========================= */
/* =========================
   RENDERIZAR (COM DATA FORMATADA)
========================= */
function renderizarAtendimentos(lista) {
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;">Nenhum atendimento encontrado.</td></tr>`;
        return;
    }

    // Função interna para formatar a data (já vimos que ela funciona!)
    const formatarData = (dataISO) => {
        const data = new Date(dataISO);
        return `${String(data.getDate()).padStart(2, '0')}/${String(data.getMonth() + 1).padStart(2, '0')}/${data.getFullYear()} ${String(data.getHours()).padStart(2, '0')}:${String(data.getMinutes()).padStart(2, '0')}`;
    };

    lista.forEach((item) => {
        tbody.innerHTML += `
            <tr>
                <td>${formatarData(item.data)}</td>
                <td>${item.paciente}</td>
                <td>${item.dentista}</td>
                <td>
                    <span class="tag ${item.cor}">
                        ${item.prioridade}
                    </span>
                </td>
                <td>
                    <div class="acoes">
                        <a href="detalhes-atendimento.html?id=${item.id}" class="btn-acao visualizar">
                            <i class="fa-regular fa-eye"></i>
                        </a>
                        <a href="editar-atendimento.html?id=${item.id}" class="btn-acao editar">
                            <i class="fa-regular fa-pen-to-square"></i>
                        </a>
                        <button class="btn-acao excluir" onclick="excluir(${item.id})">
                            <i class="fa-regular fa-trash-can"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });
}

/* =========================
   PREENCHER FILTROS (DINAMICAMENTE)
========================= */
function carregarFiltros() {
    // Reseta filtros mantendo apenas a opção padrão
    filtroDentista.innerHTML = '<option value="">Todos os dentistas</option>';
    filtroPrioridade.innerHTML = '<option value="">Todas as prioridades</option>';

    const dentistas = [...new Set(atendimentos.map(item => item.dentista))];
    dentistas.forEach(dentista => {
        filtroDentista.innerHTML += `<option value="${dentista}">${dentista}</option>`;
    });

    const prioridades = [...new Set(atendimentos.map(item => item.prioridade))];
    prioridades.forEach(prioridade => {
        filtroPrioridade.innerHTML += `<option value="${prioridade}">${prioridade}</option>`;
    });
}

/* =========================
   FILTRAR
========================= */
function filtrarAtendimentos() {
    const dentistaSelecionado = filtroDentista.value;
    const prioridadeSelecionada = filtroPrioridade.value;

    const filtrados = atendimentos.filter(item => {
        const filtroDentistaOk = dentistaSelecionado === '' || item.dentista === dentistaSelecionado;
        const filtroPrioridadeOk = prioridadeSelecionada === '' || item.prioridade === prioridadeSelecionada;
        return (filtroDentistaOk && filtroPrioridadeOk);
    });

    renderizarAtendimentos(filtrados);
}

filtroDentista.addEventListener('change', filtrarAtendimentos);
filtroPrioridade.addEventListener('change', filtrarAtendimentos);

/* =========================
   EXCLUIR DO BANCO
========================= */
async function excluir(id) {
    if (!confirm('Deseja realmente excluir este atendimento?')) return;

    try {
        const response = await fetch(`http://localhost:3000/api/atendimentos/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            alert('Atendimento excluído!');
            carregarAtendimentosDoServidor(); // Chama a função para redesenhar a tabela
        } else {
            alert('Erro ao excluir no servidor.');
        }
    } catch (error) {
        console.error('Erro na rede:', error);
    }
}