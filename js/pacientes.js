// URL do seu servidor (ajuste se mudar a porta)
const API_URL = 'http://localhost:3000/api';

// Função para listar pacientes ao carregar a página
async function carregarPacientes() {
    try {
        const response = await fetch(`${API_URL}/pacientes`);
        const pacientes = await response.json();
        
        const tabela = document.getElementById('tbodyPacientes'); // ID correto do seu HTML
        tabela.innerHTML = ''; // Limpa antes de preencher

        pacientes.forEach(p => {
            tabela.innerHTML += `
                <tr>
                    <td>${p.nome}</td>
                    <td>${p.cpf}</td>
                    <td>${p.telefone}</td>
                    <td><span class="status ativo">Ativo</span></td>
                    <td>
                        <div class="acoes">
                            <a href="detalhes-paciente.html?id=${p.id}" class="btn-acao visualizar" title="Visualizar">
                                <i class="fas fa-eye"></i>
                            </a>

                            <a href="cadastrar-paciente.html?id=${p.id}" class="btn-acao editar" title="Editar">
                                <i class="fas fa-edit"></i>
                            </a>

                            <button onclick="excluirPaciente(${p.id})" class="btn-acao excluir" title="Excluir">
                                <i class="fas fa-trash"></i>
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        console.error("Erro ao carregar pacientes:", erro);
        alert("Não foi possível conectar ao servidor.");
    }
}

// Função para excluir paciente
async function excluirPaciente(id) {
    if (confirm("Tem certeza que deseja excluir este paciente?")) {
        try {
            const response = await fetch(`${API_URL}/pacientes/${id}`, {
                method: 'DELETE'
            });
            
            const result = await response.json();
            
            if (result.sucesso) {
                alert("Paciente excluído!");
                carregarPacientes(); // Recarrega a tabela após excluir
            }
        } catch (erro) {
            console.error("Erro ao excluir:", erro);
            alert("Erro ao excluir o paciente.");
        }
    }
}

// Inicializa a listagem ao abrir a página
document.addEventListener('DOMContentLoaded', carregarPacientes);