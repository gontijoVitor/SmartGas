// backend/models/Veichle.js
// Define o modelo para gerenciar veículos no banco de dados

import db from '../config/db.js';

const Veichle = {
    // Obtém todos os veículos pelo ID do usuário
    getAllByUserId: (userId, callback) => {
        const query = 'SELECT * FROM Veiculo WHERE usuario_id = ?';
        db.query(query, [userId], callback);
    },
    // Cria um novo veículo
    create: (userId, veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario, callback) => {
        const query = 'INSERT INTO Veiculo (usuario_id, veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario) VALUES (?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [userId, veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario], callback);
    },
    // Atualiza um veículo existente
    update: (veiculoId, veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario, callback) => {
        const query = 'UPDATE Veiculo SET veiculo_marca = ?, veiculo_modelo = ?, veiculo_ano = ?, veiculo_icone = ?, veiculo_consumo_urbano = ?, veiculo_consumo_rodoviario = ? WHERE veiculo_id = ?';
        db.query(query, [veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario, veiculoId], callback);
    },
    // Exclui um veículo
    delete: (veiculoId, callback) => {
        const query = 'DELETE FROM Veiculo WHERE veiculo_id = ?';
        db.query(query, [veiculoId], callback);
    }
};

export default Veichle;