// backend/routes/postoRoutes.js
// Gerencia rotas para operações de CRUD em postos de combustível

import express from 'express';
import Posto from '../models/Posto.js';

const router = express.Router();

// Endpoint to get postos by user ID
router.get('/', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    Posto.getAllByUserId(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao carregar os postos.' });
        }
        res.status(200).json(results);
    });
});

// Endpoint to create a new posto
router.post('/', (req, res) => {
    const userId = req.session.userId;
    const { name, priceGasolina, priceEtanol, priceDiesel } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    Posto.create(userId, name, priceGasolina, priceEtanol, priceDiesel, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao criar o posto.' });
        }
        res.status(201).json({ message: 'Posto criado com sucesso!' });
    });
});

// Endpoint to update a posto
router.put('/:id', (req, res) => {
    const postoId = req.params.id;
    const { posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel } = req.body;
    Posto.update(postoId, posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar o posto.' });
        }
        res.status(200).json(result);
    });
});

// Endpoint to delete a posto
router.delete('/:id', (req, res) => {
    const postoId = req.params.id;
    Posto.delete(postoId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao deletar o posto.' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Posto não encontrado' });
        }
        res.status(200).json({ message: 'Posto deletado com sucesso!' });
    });
});

export default router;