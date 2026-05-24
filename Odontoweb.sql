-- Passo 1: Criando a base de dados
CREATE DATABASE IF NOT EXISTS odontoweb;
USE odontoweb;

-- Passo 2: Criando a tabela de Usuários
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    tipo_usuario ENUM('Administrador', 'Atendente', 'Dentista') NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_usuarios PRIMARY KEY (id),
    CONSTRAINT uq_usuario_email UNIQUE (email)
);

-- Passo 3: Criando a tabela de Pacientes
CREATE TABLE pacientes (
    id INT AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    cpf VARCHAR(14) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255),
    bairro VARCHAR(100),
    cartao_sus VARCHAR(20),
    email VARCHAR(100),
    responsavel VARCHAR(100),
    CONSTRAINT pk_pacientes PRIMARY KEY (id),
    CONSTRAINT uq_paciente_cpf UNIQUE (cpf)
);

-- Passo 4: Criando a tabela de Atendimentos
CREATE TABLE atendimentos (
    id INT AUTO_INCREMENT,
    paciente_id INT NOT NULL,
    dentista_id INT NOT NULL,
    data_hora DATETIME NOT NULL,
    prioridade ENUM('Verde', 'Amarelo', 'Vermelho') NOT NULL,
    queixa TEXT,
    status ENUM('Agendado', 'Em Espera', 'Em Atendimento', 'Concluido', 'Cancelado') DEFAULT 'Agendado',
    CONSTRAINT pk_atendimentos PRIMARY KEY (id),
    CONSTRAINT fk_atendimentos_paciente FOREIGN KEY (paciente_id) REFERENCES pacientes (id) ON DELETE CASCADE,
    CONSTRAINT fk_atendimentos_dentista FOREIGN KEY (dentista_id) REFERENCES usuarios (id) ON DELETE RESTRICT
);

-- Passo 5: Criando a tabela de Laudos e Receitas
CREATE TABLE laudos_receitas (
    id INT AUTO_INCREMENT,
    atendimento_id INT NOT NULL,
    observacoes_clinicas TEXT NOT NULL,
    prescricao_medicamentos TEXT,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_laudos_receitas PRIMARY KEY (id),
    CONSTRAINT uq_laudo_atendimento UNIQUE (atendimento_id),
    CONSTRAINT fk_laudos_atendimento FOREIGN KEY (atendimento_id) REFERENCES atendimentos (id) ON DELETE CASCADE
);