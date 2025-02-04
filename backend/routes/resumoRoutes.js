// backend/routes/resumoRoutes.js
// Gerencia rotas para operações de CRUD em resumos de consumo

import express from 'express';
import Resumo from '../models/Resumo.js';

const router = express.Router();

// Rota GET para obter resumos de consumo do usuário
router.get('/', (req, res) => {
    const userId = req.session.userId;
    const days = req.query.days || 30;
    
    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    Resumo.getAllByUserId(userId, days, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar resumos.' });
        }
        res.json(result);
    });
});

// Rota POST para criar um novo resumo de consumo
router.post('/', (req, res) => {
    const userId = req.session.userId;
    const { resumo_dia, resumo_resultado } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    Resumo.create(userId, resumo_dia, resumo_resultado, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar resumo.' });
        }
        res.status(201).json({ 
            message: 'Resumo criado com sucesso!',
            resumo_id: result.insertId 
        });
    });
});

// Rota PUT para atualizar um resumo de consumo
router.put('/:id', (req, res) => {
    const resumoId = req.params.id;
    const { resumo_dia, resumo_resultado } = req.body;
    
    Resumo.update(resumoId, resumo_dia, resumo_resultado, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar resumo.' });
        }
        res.json({ message: 'Resumo atualizado com sucesso!' });
    });
});

// Rota DELETE para excluir um resumo de consumo
router.delete('/:id', (req, res) => {
    const resumoId = req.params.id;
    
    Resumo.delete(resumoId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao excluir resumo.' });
        }
        res.json({ message: 'Resumo excluído com sucesso!' });
    });
});

export default router;