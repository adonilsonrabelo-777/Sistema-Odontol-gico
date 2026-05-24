document.addEventListener("DOMContentLoaded", () => {
    // 1. Captura o ID que vem na URL (ex: detalhes-atendimento.html?id=1)
    const urlParams = new URLSearchParams(window.location.search);
    const idAtendimento = urlParams.get('id');

    if (idAtendimento) {
        buscarAtendimento(idAtendimento);
    } else {
        alert("ID do atendimento não encontrado na URL.");
    }
});

async function buscarAtendimento(id) {
    try {
        const response = await fetch(`http://localhost:3000/api/atendimentos/${id}`);
        if (!response.ok) throw new Error('Erro ao buscar detalhes do atendimento');
        
        const data = await response.json();
        
        // Preenchendo os campos
        document.getElementById('nomePaciente').textContent = data.nome_paciente || 'Não informado';
        document.getElementById('dataAtendimento').textContent = formatarData(data.data_hora);
        document.getElementById('dentista').textContent = data.nome_dentista || 'Não informado';
        document.getElementById('cpfPaciente').textContent = data.cpf_paciente || 'Não informado';
        document.getElementById('telefonePaciente').textContent = data.telefone_paciente || 'Não informado';
        document.getElementById('prioridade').textContent = data.prioridade || 'Normal';
        
        // Cálculo simples de idade (aproximado)
        if(data.data_nascimento) {
            const anoNasc = new Date(data.data_nascimento).getFullYear();
            const anoAtual = new Date().getFullYear();
            document.getElementById('idadePaciente').textContent = (anoAtual - anoNasc) + " anos";
        }

        document.getElementById('queixaPrincipal').textContent = data.queixa || 'Sem queixas';
        
    } catch (error) {
        console.error('Erro ao carregar detalhes:', error);
        alert("Não foi possível carregar os dados deste atendimento.");
    }
}

// Função auxiliar para deixar a data legível
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR');
}