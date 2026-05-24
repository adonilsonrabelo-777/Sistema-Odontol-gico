/* =========================
   ESTADO DA APLICAÇÃO
========================= */
let prioridadeSelecionada = '';
let corSelecionada = '';

/* =========================
   CARREGAR DADOS DO BANCO (PACIENTES E DENTISTAS)
========================= */
document.addEventListener("DOMContentLoaded", () => {
    carregarPacientesSelect();
    carregarDentistasSelect(); // 🔥 Chamada para carregar os dentistas do banco
});

// Busca os pacientes cadastrados no banco
async function carregarPacientesSelect() {
    try {
        const response = await fetch('http://localhost:3000/api/pacientes');
        if (!response.ok) throw new Error('Erro ao buscar pacientes');
        
        const pacientes = await response.json();
        const selectPaciente = document.getElementById('paciente');
        
        selectPaciente.innerHTML = '<option value="">Selecione o paciente</option>';
        
        pacientes.forEach(p => {
            const option = document.createElement('option');
            option.value = p.nome;
            option.textContent = p.nome;
            selectPaciente.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar pacientes:', error);
    }
}

// 🔥 NOVA FUNÇÃO: Busca apenas os utilizadores cadastrados como 'DENTISTA'
async function carregarDentistasSelect() {
    try {
        const response = await fetch('http://localhost:3000/api/dentistas');
        if (!response.ok) throw new Error('Erro ao buscar dentistas');
        
        const dentistas = await response.json();
        const selectDentista = document.getElementById('dentista');
        
        // Limpa as opções estáticas do HTML
        selectDentista.innerHTML = '<option value="">Selecione o dentista</option>';
        
        dentistas.forEach(d => {
            const option = document.createElement('option');
            option.value = d.nome; 
            option.textContent = d.nome;
            selectDentista.appendChild(option);
        });
    } catch (error) {
        console.error('Erro ao carregar dentistas:', error);
    }
}

/* =========================
   SELEÇÃO DE PRIORIDADE
========================= */
/* =========================
   SELEÇÃO DE PRIORIDADE
========================= */
function selecionarPrioridade(elemento, prioridade, cor) {
    // 1. Remove a classe 'selecionado' de todos os cards para limpar seleções anteriores
    document.querySelectorAll('.card-prioridade').forEach(card => {
        card.classList.remove('selecionado');
    });

    // 2. Adiciona a classe 'selecionado' apenas ao card que foi clicado
    elemento.classList.add('selecionado');

    // 3. Salva os dados no estado global para enviar corretamente ao banco de dados
    prioridadeSelecionada = prioridade;
    corSelecionada = cor;

    console.log("Prioridade fixada:", prioridadeSelecionada, "Cor:", corSelecionada);
}

/* =========================
   SUBMISSÃO DO FORMULÁRIO
========================= */
async function salvarAtendimento(event) {
    event.preventDefault(); // Impede o recarregamento padrão da página

    // Captura os valores dos campos
    const paciente = document.getElementById('paciente').value;
    const data = document.getElementById('data').value;
    const dentista = document.getElementById('dentista').value;
    const queixa = document.getElementById('queixa').value;

    // Validações básicas obrigatórias
    if (!paciente) {
        alert("Por favor, selecione um paciente.");
        return;
    }
    if (!data) {
        alert("Por favor, selecione a data do atendimento.");
        return;
    }
    if (!dentista) {
        alert("Por favor, selecione o dentista responsável.");
        return;
    }
    if (!prioridadeSelecionada) {
        alert("Por favor, selecione um nível de prioridade (Verde, Amarelo ou Vermelho).");
        return;
    }

    // Estrutura o objeto de dados conforme esperado pela API no server.js
    const novoAtendimento = {
        paciente: paciente,
        data: data,
        dentista: dentista,
        prioridade: prioridadeSelecionada,
        cor: corSelecionada,
        queixa: queixa || "Sem queixas registradas"
    };

    try {
        // Envia a requisição POST para a API do Back-end
        const response = await fetch('http://localhost:3000/api/atendimentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAtendimento)
        });

        if (response.ok) {
            alert("Atendimento registrado com sucesso!");
            // Redireciona de volta para a lista geral de atendimentos
            window.location.href = 'atendimentos.html';
        } else {
            const erroData = await response.json();
            alert("Erro ao salvar atendimento: " + (erroData.erro || response.statusText));
        }
    } catch (error) {
        console.error("Erro na comunicação com o servidor:", error);
        alert("Não foi possível conectar ao servidor. Verifique se o back-end está ativo.");
    }
}

// Vincula o evento de submissão ao formulário da página
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', salvarAtendimento);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // ... (seu código atual de carregar dentistas e pacientes)

    // Adicione isto aqui:
    const btnCancelar = document.getElementById('btnCancelar');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            window.location.href = 'atendimentos.html';
        });
    }
});