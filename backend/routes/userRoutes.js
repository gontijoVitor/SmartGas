// backend/routes/userRoutes.js
// Gerencia rotas para autenticação e gerenciamento de usuários

import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// Rota para verificar se o usuário está logado
router.get('/check-login', (req, res) => {
    if (req.session.userId) { // Verifica se há um ID de usuário na sessão
        res.json({ isLoggedIn: true, username: req.session.username });
    } else {
        res.json({ isLoggedIn: false, message: 'Nenhum usuário está logado.' });
    }
});

// Rota de login
router.post('/login', (req, res) => {
    const { usuario_user, senha } = req.body;

    if (!usuario_user || !senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const query = `SELECT * FROM Usuario WHERE TRIM(usuario_email) = ? AND TRIM(usuario_senha) = ? LIMIT 1`;

    db.query(query, [usuario_user.trim(), senha.trim()], (err, results) => {
        if (err) {
            console.error("Erro no banco de dados:", err.message);
            return res.status(500).json({ message: 'Erro no servidor', error: err.message });
        }
        if (results.length > 0) {
            req.session.userId = results[0].usuario_id;
            req.session.username = results[0].usuario_user;
            res.json({ 
                message: 'Login realizado com sucesso!',
                username: results[0].usuario_user 
            });
        } else {
            res.status(401).json({ message: 'Credenciais inválidas.' });
        }
    });
});

// Rota de registro
router.post('/register', async (req, res) => {
    const { usuario_user, usuario_email, usuario_senha } = req.body;

    if (!usuario_user || !usuario_email || !usuario_senha) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    }

    const queryCheck = 'SELECT * FROM Usuario WHERE usuario_user = ? OR usuario_email = ?';
    const queryInsert = 'INSERT INTO Usuario (usuario_user, usuario_email, usuario_senha) VALUES (?, ?, ?)';

    // Verificando se o usuário ou e-mail já existem
    db.query(queryCheck, [usuario_user, usuario_email], (err, results) => {
        if (results.length > 0) {
            return res.status(409).json({ message: 'Usuário ou e-mail já cadastrado.' });
        }

        // Inserindo novo usuário
        db.query(queryInsert, [usuario_user, usuario_email, usuario_senha], (err, result) => {
            if (err) {
                console.error('Erro ao cadastrar:', err.message);
                return res.status(500).json({ message: 'Erro ao cadastrar usuário.', error: err.message });
            }
            res.status(201).json({ message: 'Usuário cadastrado com sucesso!' });
        });
    });
});

// Rota de logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Erro ao encerrar a sessão:', err.message);
            return res.status(500).json({ message: 'Erro ao encerrar a sessão' });
        }
        res.clearCookie('connect.sid');
        res.json({ message: 'Logout realizado com sucesso!' });
    });
});

export default router;