// backend/routes/configMetricRoutes.js
// Gerencia rotas para configurações de métricas do usuário (moeda, medidas de consumo e distância)

import express from 'express';
import ConfigMetric from '../models/ConfigMetric.js';

const router = express.Router();

// Rota GET para obter configurações de unidades do usuário
router.get('/unidades', (req, res) => {
    const userId = req.session.userId;
    
    if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    ConfigMetric.getByUserId(userId, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar configurações.' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'Configurações não encontradas.' });
        }
        res.json(result[0]);
    });
});

// Rota PUT para atualizar configurações de unidades do usuário
router.put('/unidades', (req, res) => {
    const userId = req.session.userId;
    const { moeda, medida_consumo, distancia } = req.body;

    if (!userId) {
        return res.status(401).json({ error: 'Usuário não autenticado.' });
    }

    if (!moeda || !medida_consumo || !distancia) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios.' });
    }

    ConfigMetric.update(userId, moeda, medida_consumo, distancia, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao atualizar configurações.' });
        }
        res.json({ message: 'Configurações atualizadas com sucesso!' });
    });
});

export default router;