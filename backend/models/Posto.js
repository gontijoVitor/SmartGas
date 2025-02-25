// backend/models/Posto.js
// Define o modelo para gerenciar postos de combustível no banco de dados

import db from '../config/db.js';

const Posto = {
    // Obtém todos os postos pelo ID do usuário
    getAllByUserId: (userId, callback) => {
        const query = 'SELECT * FROM Posto WHERE usuario_id = ?';
        db.query(query, [userId], callback);
    },
    // Cria um novo posto
    create: (userId, posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel, callback) => {
        const query = 'INSERT INTO Posto (usuario_id, posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel) VALUES (?, ?, ?, ?, ?)';
        db.query(query, [userId, posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel], callback);
    },
    // Atualiza um posto existente
    update: (postoId, posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel, callback) => {
        const query = 'UPDATE Posto SET posto_nome = ?, posto_valor_gasolina = ?, posto_valor_etanol = ?, posto_valor_diesel = ? WHERE posto_id = ?';
        db.query(query, [posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel, postoId], callback);
    },
    // Exclui um posto
    delete: (postoId, callback) => {
        const query = 'DELETE FROM Posto WHERE posto_id = ?';
        db.query(query, [postoId], callback);
    }
};

export default Posto;