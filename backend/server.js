const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Conexão com o Banco de Dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '@Pkf414745',
    database: 'odontoweb'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erro ao conectar no banco:', err);
        return;
    }
    console.log('🔥 Conectado ao banco de dados OdontoWeb com sucesso!');
});

// --- ROTAS DE USUÁRIOS ---

app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    const query = "SELECT id, nome, tipo_usuario FROM usuarios WHERE email = ? AND senha = ?";
    db.query(query, [email, senha], (err, results) => {
        if (err) return res.status(500).json({ erro: "Erro no servidor" });
        if (results.length > 0) {
            res.json({ sucesso: true, usuario: results[0] });
        } else {
            res.status(401).json({ sucesso: false, mensagem: "Email ou senha incorretos!" });
        }
    });
});

app.post('/api/cadastrar', (req, res) => {
    const { nome, email, tipoUsuario, registro, novaSenha } = req.body;
    const query = "INSERT INTO usuarios (nome, email, tipo_usuario, registro, senha) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [nome, email, tipoUsuario, registro, novaSenha], (err, result) => {
        if (err) return res.status(500).json({ sucesso: false, mensagem: "Erro ao cadastrar usuário" });
        res.json({ sucesso: true, mensagem: "Usuário cadastrado com sucesso!" });
    });
});

// --- ROTAS DE PACIENTES (CRUD COMPLETO) ---

// Listar
app.get('/api/pacientes', (req, res) => {
    db.query("SELECT * FROM pacientes", (err, results) => {
        if (err) return res.status(500).json({ erro: "Erro ao buscar pacientes" });
        res.json(results);
    });
});

// 🌟 NOVA ROTA: Buscar UM paciente específico pelo ID (Faltava essa!)
app.get('/api/pacientes/:id', (req, res) => {
    const { id } = req.params;
    const query = "SELECT * FROM pacientes WHERE id = ?";
    
    db.query(query, [id], (err, results) => {
        if (err) {
            console.error('Erro ao buscar paciente:', err);
            return res.status(500).json({ erro: "Erro no servidor ao buscar o paciente" });
        }
        
        // Se não encontrar nenhum paciente com esse ID
        if (results.length === 0) {
            return res.status(404).json({ erro: "Paciente não encontrado" });
        }
        
        // Retorna apenas o primeiro objeto encontrado (em vez do array)
        res.json(results[0]);
    });
});

// --- ROTAS DE PACIENTES ---

// Cadastrar Paciente com Validação de Tamanho
app.post('/api/pacientes', (req, res) => {
    const { nome, data_nascimento, cpf, telefone, endereco, bairro, cartao_sus, email, responsavel } = req.body;
    
    // 1. Validação de campos obrigatórios básicos
    if (!nome || !cpf || !data_nascimento || !telefone) {
        return res.status(400).json({ erro: "Nome, CPF, Data de Nascimento e Telefone são obrigatórios!" });
    }

    // 2. Limpeza e Restrição de tamanho (Apenas números para CPF e Telefone)
    const cpfLimpo = cpf.replace(/\D/g, ''); // Remove pontos e traços
    const telefoneLimpo = telefone.replace(/\D/g, ''); // Remove parênteses e espaços

    // CPF deve ter exatamente 11 dígitos
    if (cpfLimpo.length !== 11) {
        return res.status(400).json({ erro: "O CPF deve conter exatamente 11 números dígitos!" });
    }

    // Celular/Telefone comercial aceitável entre 10 e 11 dígitos (com DDD)
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        return res.status(400).json({ erro: "O telefone informado é inválido! Deve conter entre 10 e 11 dígitos." });
    }

    // Data de nascimento (Apenas um check básico de string formato AAAA-MM-DD ou DD/MM/AAAA)
    if (data_nascimento.length > 10) {
        return res.status(400).json({ erro: "Formato de data de nascimento inválido!" });
    }

    const sql = `INSERT INTO pacientes (nome, data_nascimento, cpf, telefone, endereco, bairro, cartao_sus, email, responsavel) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    db.query(sql, [nome, data_nascimento, cpfLimpo, telefoneLimpo, endereco, bairro, cartao_sus, email, responsavel], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ erro: "Erro ao cadastrar paciente no banco" });
        }
        res.json({ sucesso: true, id: result.insertId });
    });
});

// Editar Paciente com Validação de Tamanho
app.put('/api/pacientes/:id', (req, res) => {
    const { id } = req.params;
    const { nome, data_nascimento, cpf, telefone, endereco, bairro, cartao_sus, email, responsavel } = req.body;
    
    if (!nome || !cpf || !data_nascimento || !telefone) {
        return res.status(400).json({ erro: "Campos obrigatórios não podem ficar vazios!" });
    }

    const cpfLimpo = cpf.replace(/\D/g, '');
    const telefoneLimpo = telefone.replace(/\D/g, '');

    if (cpfLimpo.length !== 11) {
        return res.status(400).json({ erro: "O CPF deve conter exatamente 11 números dígitos!" });
    }

    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        return res.status(400).json({ erro: "O telefone informado é inválido! Deve conter entre 10 e 11 dígitos." });
    }

    if (data_nascimento.length > 10) {
        return res.status(400).json({ erro: "Formato de data de nascimento inválido!" });
    }

    const sql = `UPDATE pacientes SET nome=?, data_nascimento=?, cpf=?, telefone=?, endereco=?, bairro=?, cartao_sus=?, email=?, responsavel=? WHERE id=?`;
    db.query(sql, [nome, data_nascimento, cpfLimpo, telefoneLimpo, endereco, bairro, cartao_sus, email, responsavel, id], (err, result) => {
        if (err) return res.status(500).json({ erro: "Erro ao atualizar os dados do paciente" });
        res.json({ sucesso: true, message: "Paciente atualizado com sucesso!" });
    });
});

// Excluir
app.delete('/api/pacientes/:id', (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM pacientes WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json({ erro: "Erro ao excluir" });
        res.json({ sucesso: true, mensagem: "Paciente removido!" });
    });
});

// 3. Ligando o Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});