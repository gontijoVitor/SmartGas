// backend/routes/veichleRoutes.js
// Gerencia rotas para operações de CRUD em veículos

import express from 'express';
import Veichle from '../models/Veichle.js';

const router = express.Router();

// Rota GET para obter todos os veículos pelo ID do usuário
router.get('/', (req, res) => {
    const userId = req.session.userId;
    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    Veichle.getAllByUserId(userId, (err, results) => {
        if (err) {
            console.error('Erro ao carregar os veículos:', err.message);
            return res.status(500).json({ error: 'Erro ao carregar os veículos.' });
        }
        res.status(200).json(results);
    });
});

// Rota POST para criar um novo veículo
router.post('/', (req, res) => {
    const userId = req.session.userId;
    const { veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario } = req.body;
    if (!userId) {
        return res.status(401).json({ message: 'Usuário não autenticado.' });
    }
    Veichle.create(userId, veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario, (err, result) => {
        if (err) {
            console.error('Erro ao criar o veículo:', err.message);
            return res.status(500).json({ error: 'Erro ao criar o veículo.' });
        }
        res.status(201).json({ message: 'Veículo criado com sucesso!' });
    });
});

// Rota PUT para atualizar um veículo
router.put('/:id', (req, res) => {
    const veiculoId = req.params.id;
    const { veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario } = req.body;
    Veichle.update(veiculoId, veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario, (err, result) => {
        if (err) {
            console.error('Erro ao atualizar o veículo:', err.message);
            return res.status(500).json({ error: 'Erro ao atualizar o veículo.' });
        }
        res.status(200).json(result);
    });
});

// Rota DELETE para excluir um veículo
router.delete('/:id', (req, res) => {
    const veiculoId = req.params.id;
    
    if (!veiculoId) {
        return res.status(400).json({ message: 'ID do veículo não fornecido' });
    }

    Veichle.delete(veiculoId, (err, result) => {
        if (err) {
            console.error('Erro ao deletar veículo:', err.message);
            return res.status(500).json({ message: 'Erro ao deletar veículo' });
        }
        res.json({ message: 'Veículo deletado com sucesso' });
    });
});

export default router;