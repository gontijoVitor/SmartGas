// backend/models/Route.js
// Define o modelo para gerenciar rotas de viagem no banco de dados

import db from '../config/db.js';

const Route = {
    // Obtém todas as rotas pelo ID do usuário
    getAllByUserId: (userId, callback) => {
        const query = 'SELECT * FROM Rota WHERE usuario_id = ?';
        db.query(query, [userId], callback);
    },
    // Cria uma nova rota
    create: (userId, pointA, pointB, distance, callback) => {
        const query = 'INSERT INTO Rota (usuario_id, rota_ponto_a, rota_ponto_b, rota_distancia) VALUES (?, ?, ?, ?)';
        db.query(query, [userId, pointA, pointB, distance], callback);
    },
    // Atualiza uma rota existente
    update: (routeId, pointA, pointB, distance, callback) => {
        const query = 'UPDATE Rota SET rota_ponto_a = ?, rota_ponto_b = ?, rota_distancia = ? WHERE rota_id = ?';
        db.query(query, [pointA, pointB, distance, routeId], callback);
    },
    // Exclui uma rota
    delete: (routeId, callback) => {
        const query = 'DELETE FROM Rota WHERE rota_id = ?';
        db.query(query, [routeId], callback);
    }
};

export default Route;