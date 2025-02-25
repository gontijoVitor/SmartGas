// backend/models/ConfigUser.js
// Define o modelo para gerenciar configurações de usuário no banco de dados

import db from '../config/db.js';

const ConfigUser = {
    // Verifica se a senha atual do usuário está correta
    verifyPassword: (userId, password, callback) => {
        const query = 'SELECT usuario_senha FROM Usuario WHERE usuario_id = ? AND usuario_senha = ?';
        db.query(query, [userId, password], (err, results) => {
            if (err) return callback(err);
            callback(null, results.length > 0);
        });
    },

    // Atualiza a senha do usuário
    updatePassword: (userId, newPassword, callback) => {
        const query = 'UPDATE Usuario SET usuario_senha = ? WHERE usuario_id = ?';
        db.query(query, [newPassword, userId], callback);
    }
};

export default ConfigUser;