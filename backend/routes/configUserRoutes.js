// backend/routes/configUserRoutes.js
// Gerencia rotas para configurações de usuário, incluindo atualização de senha

import express from 'express';
import ConfigUser from '../models/ConfigUser.js';

const router = express.Router();

// Rota PUT para atualizar a senha do usuário
router.put('/password', (req, res) => {
    const userId = req.session.userId;
    const { currentPassword, newPassword } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    if (!currentPassword || !newPassword) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verifica se a senha atual está correta
    ConfigUser.verifyPassword(userId, currentPassword, (err, isCorrect) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao verificar senha' });
        }
        if (!isCorrect) {
            return res.status(401).json({ error: 'Senha atual incorreta' });
        }

        // Atualiza a senha do usuário
        ConfigUser.updatePassword(userId, newPassword, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Erro ao atualizar senha' });
            }
            res.status(200).json({ message: 'Senha atualizada com sucesso' });
        });
    });
});

export default router;