// backend/models/ConfigMetric.js
// Define o modelo para gerenciar configurações de métricas do usuário no banco de dados

import db from '../config/db.js';

const ConfigMetric = {
    // Obtém as configurações de métricas do usuário pelo ID
    getByUserId: (userId, callback) => {
        const query = 'SELECT moeda, medida_consumo, distancia FROM Configuracoes WHERE usuario_id = ?';
        db.query(query, [userId], callback);
    },

    // Atualiza as configurações de métricas do usuário
    update: (userId, moeda, medida_consumo, distancia, callback) => {
        const query = 'UPDATE Configuracoes SET moeda = ?, medida_consumo = ?, distancia = ? WHERE usuario_id = ?';
        db.query(query, [moeda, medida_consumo, distancia, userId], callback);
    }
};

export default ConfigMetric;