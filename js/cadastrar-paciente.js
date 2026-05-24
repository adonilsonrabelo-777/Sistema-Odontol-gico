/* =========================
   FORMULÁRIO E CONFIGURAÇÃO
========================= */
const form = document.getElementById('formPaciente');
const API_URL = 'http://localhost:3000/api';

// Captura os parâmetros da URL para verificar se veio um ID de edição
const urlParams = new URLSearchParams(window.location.search);
const pacienteId = urlParams.get('id');

/* =========================
   PASSO 1: CARREGAR DADOS (Se for Edição)
========================= */
if (pacienteId) {
    // Feedback visual: altera o texto do botão principal para Atualizar
    const btnSalvar = form.querySelector('button[type="submit"]');
    if (btnSalvar) btnSalvar.textContent = 'Atualizar Cadastro';

    // Busca os dados específicos deste paciente no Back-end pelo ID
    fetch(`${API_URL}/pacientes/${pacienteId}`)
        .then(response => {
            if (!response.ok) throw new Error('Paciente não encontrado');
            return response.json();
        })
        .then(paciente => {
            if (paciente) {
                // Preenche cada campo do formulário com o dado vindo do Banco de Dados
                document.getElementById('nome').value = paciente.nome || '';
                
                // Trata a data para o formato correto aceito pelo <input type="date"> (AAAA-MM-DD)
                if (paciente.data_nascimento) {
                    document.getElementById('nascimento').value = paciente.data_nascimento.substring(0, 10);
                }
                
                document.getElementById('cpf').value = paciente.cpf || '';
                document.getElementById('telefone').value = paciente.telefone || '';
                document.getElementById('endereco').value = paciente.endereco || '';
                document.getElementById('bairro').value = paciente.bairro || '';
                document.getElementById('sus').value = paciente.cartao_sus || '';
                document.getElementById('email').value = paciente.email || '';
                document.getElementById('responsavel').value = paciente.responsavel || '';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar dados do paciente:', error);
            alert('Erro ao carregar dados do paciente para edição.');
        });
}

/* =========================
   PASSO 2: ENVIAR (SALVAR OU ATUALIZAR)
========================= */
form.addEventListener('submit', async function (event) {
    event.preventDefault();

    // Captura dos valores atuais dos inputs
    const dadosPaciente = {
        nome: document.getElementById('nome').value,
        data_nascimento: document.getElementById('nascimento').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value,
        endereco: document.getElementById('endereco').value,
        bairro: document.getElementById('bairro').value,
        cartao_sus: document.getElementById('sus').value,
        email: document.getElementById('email').value,
        responsavel: document.getElementById('responsavel').value
    };

    /* VALIDAÇÃO SIMPLES */
    if (dadosPaciente.nome === '' || dadosPaciente.cpf === '') {
        alert('Preencha os campos obrigatórios (Nome e CPF).');
        return;
    }

    // Configuração padrão: Cadastro Novo (POST para /api/pacientes)
    let url = `${API_URL}/pacientes`;
    let metodo = 'POST';

    // Se for uma Edição: muda para Atualizar (PUT para /api/pacientes/:id)
    if (pacienteId) {
        url = `${API_URL}/pacientes/${pacienteId}`;
        metodo = 'PUT';
    }

    /* ENVIO PARA O BACK-END */
    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dadosPaciente)
        });

        const result = await response.json();

        if (result.sucesso || result.id || response.status === 200) {
            alert(pacienteId ? 'Cadastro do paciente atualizado com sucesso!' : 'Paciente cadastrado com sucesso!');
            window.location.href = 'pacientes.html'; // Volta para a gestão de pacientes
        } else {
            alert('Erro ao salvar os dados do paciente.');
        }
    } catch (error) {
        console.error('Erro na comunicação:', error);
        alert('Erro ao conectar com o servidor.');
    }
});

/* =========================
   BOTÃO CANCELAR
========================= */
const btnCancelar = document.getElementById('btnCancelar') || document.querySelector('.btn-cancelar') || document.querySelector('button[type="button"]');
if (btnCancelar) {
    btnCancelar.addEventListener('click', function () {
        window.location.href = 'pacientes.html';
    });
}

/* =========================
   MÁSCARAS
========================= */
const cpfInput = document.getElementById('cpf');
if (cpfInput) {
    cpfInput.addEventListener('input', function () {
        let valor = cpfInput.value.replace(/\D/g, '');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
        valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
        cpfInput.value = valor;
    });
}

const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function () {
        let valor = telefoneInput.value.replace(/\D/g, '');
        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
        valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
        telefoneInput.value = valor;
    });
}