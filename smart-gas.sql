-- Criação do banco de dados smartgas
CREATE DATABASE IF NOT EXISTS smartgas;
USE smartgas;

-- Criação da tabela Usuario
CREATE TABLE IF NOT EXISTS Usuario (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_user VARCHAR(50) NOT NULL,
    usuario_email VARCHAR(100) NOT NULL,
    usuario_senha VARCHAR(40) NOT NULL
);

-- Criação da tabela Posto
CREATE TABLE IF NOT EXISTS Posto (
    posto_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    posto_nome VARCHAR(100) NOT NULL,
    posto_valor_gasolina DECIMAL(5,2) DEFAULT NULL,
    posto_valor_etanol DECIMAL(5,2) DEFAULT NULL,
    posto_valor_diesel DECIMAL(5,2) DEFAULT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);

-- Criação da tabela Rota
CREATE TABLE IF NOT EXISTS Rota (
    rota_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    rota_ponto_a VARCHAR(60) NOT NULL,
    rota_ponto_b VARCHAR(60) NOT NULL,
    rota_distancia DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);

-- Criação da tabela Veiculo
CREATE TABLE IF NOT EXISTS Veiculo (
    veiculo_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    veiculo_marca VARCHAR(50) NOT NULL,
    veiculo_modelo VARCHAR(50) NOT NULL,
    veiculo_ano INT NOT NULL,
    veiculo_icone INT NOT NULL,
    veiculo_consumo_urbano DECIMAL(10,2) NOT NULL,
    veiculo_consumo_rodoviario DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);

-- Criação da tabela Resumo
CREATE TABLE IF NOT EXISTS Resumo (
    resumo_id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    resumo_dia DATE NOT NULL,
    resumo_resultado DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);

-- Inserção de dados na tabela Configuracoes
CREATE TABLE Configuracoes (
    usuario_id INT NOT NULL,
    moeda VARCHAR(5),
    medida_consumo VARCHAR(50),
    distancia VARCHAR(10),
    PRIMARY KEY (usuario_id),
    FOREIGN KEY (usuario_id) REFERENCES Usuario(usuario_id)
);


-- Inserção de dados na tabela Usuario
INSERT INTO Usuario (usuario_user, usuario_email, usuario_senha)
VALUES 
('user1', 'user1@example.com', 'senha123'),
('user2', 'user2@example.com', 'senha456');

-- Inserção de dados na tabela Posto
INSERT INTO Posto (usuario_id, posto_nome, posto_valor_gasolina, posto_valor_etanol, posto_valor_diesel)
VALUES 
(1, 'Posto Central', 5.49, 3.89, 6.59),
(2, 'Posto Avenida', 5.59, 3.99, 6.69);

-- Inserção de dados na tabela Rota
INSERT INTO Rota (usuario_id, rota_ponto_a, rota_ponto_b, rota_distancia)
VALUES 
(1, 'Rua A', 'Rua B', 15.5),
(2, 'Av. X', 'Av. Y', 20.0);

-- Inserção de dados na tabela Veiculo
INSERT INTO Veiculo (usuario_id, veiculo_marca, veiculo_modelo, veiculo_ano, veiculo_icone, veiculo_consumo_urbano, veiculo_consumo_rodoviario)
VALUES 
(1, 'Toyota', 'Corolla', 2020, '2', 12.5, 15.0),
(2, 'Honda', 'Civic', 2019, '2', 11.0, 14.5);

-- Inserção de dados na tabela Resumo
INSERT INTO Resumo (resumo_id, usuario_id, resumo_dia, resumo_resultado)
VALUES 
(1, 1, '2024-11-28', 10.50),
(2, 1, '2024-11-29', 20.75);

-- Inserção de dados na tabela Resumo
INSERT INTO Configuracoes (usuario_id, moeda, medida_consumo, distancia) 
VALUES 
(1, 'USD', 'litros', 'mi'),
(2, 'BRL', 'litros', 'km');

-- Leitura dos dados da tabela Usuario
SELECT * FROM Usuario;

-- Leitura dos dados da tabela Posto
SELECT * FROM Posto;

-- Leitura dos dados da tabela Rota
SELECT * FROM Rota;

-- Leitura dos dados da tabela Veiculo
SELECT * FROM Veiculo;

-- Leitura dos dados da tabela Resumo
SELECT * FROM Resumo;

-- Leitura dos dados da tabela Configuracoes
SELECT * FROM Configuracoes;

-- Limpeza dos dados de cada tabela

-- Limpar dados da tabela Resumo
DELETE FROM Resumo;

-- Limpar dados da tabela Veiculo
DELETE FROM Veiculo;

-- Limpar dados da tabela Rota
DELETE FROM Rota;

-- Limpar dados da tabela Posto
DELETE FROM Posto;

-- Limpar dados da tabela Usuario
DELETE FROM Usuario;

