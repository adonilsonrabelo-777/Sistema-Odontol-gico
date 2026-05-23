const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Libera o front-end para conversar com o back-end
app.use(express.json());

// 1. Conexão com o Banco de Dados OdontoWeb
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',         // Mude para 'root'
    password: '@Pkf414745',         // Deixe vazio se não definiu senha
    database: 'odontoweb'
});

db.connect((err) => {
    if (err) {
        console.error('❌ Erro ao conectar no banco:', err);
        return;
    }
    console.log('🔥 Conectado ao banco de dados OdontoWeb com sucesso!');
});

// 2. Rota de Login para integrar com o front-end do colega
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

// 3. Ligando o Servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta http://localhost:${PORT}`);
});