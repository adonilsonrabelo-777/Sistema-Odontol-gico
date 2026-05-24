document.addEventListener("DOMContentLoaded", () => {
    // 1. Captura o ID do paciente enviado na URL (ex: detalhes-paciente.html?id=3)
    const urlParams = new URLSearchParams(window.location.search);
    const pacienteId = urlParams.get('id');

    if (!pacienteId) {
        alert("Paciente não identificado!");
        window.location.href = "pacientes.html";
        return;
    }

    // 2. CORREÇÃO AQUI: Captura o botão pela CLASSE original do HTML (.btn-editar)
    const btnEditar = document.querySelector(".btn-editar");
    if (btnEditar) {
        btnEditar.addEventListener("click", () => {
            // Redireciona mantendo o ID para a página de alteração
            window.location.href = `cadastrar-paciente.html?id=${pacienteId}`;
        });
    }

    const btnImprimir = document.querySelector(".btn-imprimir");
    if (btnImprimir) {
        btnImprimir.addEventListener("click", () => {
            window.print(); // Abre a janela de impressão nativa do sistema/navegador
        });
    }

    // URL base da tua API integrada com o banco de dados
    const API_URL = 'http://localhost:3000/api';

    // 3. Faz a busca do paciente específico por ID para preencher os cards
    fetch(`${API_URL}/pacientes/${pacienteId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro ao buscar dados do paciente.");
            }
            return response.json();
        })
        .then(paciente => {
            // Preenche as informações principais
            document.getElementById("nomePaciente").textContent = paciente.nome || "Não informado";
            
            const statusElement = document.getElementById("statusPaciente");
            if (statusElement) {
                statusElement.textContent = paciente.status || "Ativo";
            }

            // Preenche o CARD: Dados Pessoais
            document.getElementById("cpfPaciente").textContent = paciente.cpf || "Não informado";
            document.getElementById("telefonePaciente").textContent = paciente.telefone || "Não informado";
            
            if (paciente.data_nascimento) {
                const data = new Date(paciente.data_nascimento);
                document.getElementById("nascimentoPaciente").textContent = data.toLocaleDateString('pt-BR', { timeZone: 'UTC' });
            } else {
                document.getElementById("nascimentoPaciente").textContent = "Não informada";
            }

            // Preenche o CARD: Endereço
            document.getElementById("enderecoPaciente").textContent = paciente.endereco || "Não informado";
            document.getElementById("bairroPaciente").textContent = paciente.bairro || "Não informado";
            document.getElementById("cidadePaciente").textContent = paciente.cidade || "Não informada";

            // Preenche o CARD: Histórico Odontológico
            document.getElementById("ultimoAtendimento").textContent = paciente.ultimo_atendimento || "Nenhum registro";
            document.getElementById("dentistaPaciente").textContent = paciente.dentista_responsavel || "Não designado";
            document.getElementById("procedimentoPaciente").textContent = paciente.procedimento || "Nenhum";
            document.getElementById("retornoPaciente").textContent = paciente.proximo_retorno || "Não agendado";
            document.getElementById("obsPaciente").textContent = paciente.observacoes || "Sem observações";
        })
        .catch(error => {
            console.error("Erro ao carregar detalhes:", error);
            alert("Erro ao carregar as informações do paciente do banco de dados.");
        });
});