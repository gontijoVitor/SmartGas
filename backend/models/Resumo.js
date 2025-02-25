// backend/models/Resumo.js
// Define o modelo para gerenciar resumos de consumo no banco de dados

import db from '../config/db.js';

const Resumo = {
    // Obtém todos os resumos de consumo pelo ID do usuário e intervalo de dias
    getAllByUserId: (userId, days, callback) => {
        const query = `
            SELECT * FROM Resumo 
            WHERE usuario_id = ? 
            AND resumo_dia >= DATE_SUB(CURRENT_DATE, INTERVAL ? DAY)
            ORDER BY resumo_dia ASC
        `;
        db.query(query, [userId, days], callback);
    },
    // Cria um novo resumo de consumo
    create: (usuario_id, resumo_dia, resumo_resultado, callback) => {
        const query = 'INSERT INTO Resumo (usuario_id, resumo_dia, resumo_resultado) VALUES (?, ?, ?)';
        db.query(query, [usuario_id, resumo_dia, resumo_resultado], callback);
    },
    // Atualiza um resumo de consumo existente
    update: (resumoId, resumo_dia, resumo_resultado, callback) => {
        const query = 'UPDATE Resumo SET resumo_dia = ?, resumo_resultado = ? WHERE resumo_id = ?';
        db.query(query, [resumo_dia, resumo_resultado, resumoId], callback);
    },
    // Exclui um resumo de consumo
    delete: (resumoId, callback) => {
        const query = 'DELETE FROM Resumo WHERE resumo_id = ?';
        db.query(query, [resumoId], callback);
    }
};

export default Resumo;