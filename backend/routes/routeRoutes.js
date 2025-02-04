// backend/routes/routeRoutes.js
// Gerencia rotas para operações de CRUD em rotas de viagem

import express from 'express';
import Route from '../models/Route.js';

const router = express.Router();

// Rota GET para obter rotas pelo ID do usuário
router.get('/', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    Route.getAllByUserId(userId, (err, results) => {
        if (err) {
            console.error('Erro ao buscar rotas:', err);
            res.status(500).json({ message: err.message });
        } else {
            res.json(results);
        }
    });
});

// Rota POST para criar uma nova rota
router.post('/', (req, res) => {
    const userId = req.session.userId;
    const { pointA, pointB, distance } = req.body;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    Route.create(userId, pointA, pointB, distance, (err, result) => {
        if (err) {
            console.error('Erro ao adicionar rota:', err);
            res.status(500).json({ message: err.message });
        } else {
            res.status(201).json({ message: 'Rota adicionada com sucesso', rota_id: result.insertId });
        }
    });
});

// Rota PUT para atualizar uma rota existente
router.put('/:id', (req, res) => {
    const userId = req.session.userId;
    const { pointA, pointB, distance } = req.body;
    const routeId = req.params.id;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    Route.update(routeId, pointA, pointB, distance, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar rota:', err);
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: 'Rota atualizada com sucesso' });
        }
    });
});

// Rota DELETE para excluir uma rota
router.delete('/:id', (req, res) => {
    const userId = req.session.userId;
    const routeId = req.params.id;

    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }

    Route.delete(routeId, (err, result) => {
        if (err) {
            console.error('Erro ao deletar rota:', err);
            res.status(500).json({ message: err.message });
        } else {
            res.status(200).json({ message: 'Rota deletada com sucesso' });
        }
    });
});

export default router;