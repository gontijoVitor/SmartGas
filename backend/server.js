// backend/server.js
// Configura e inicia o servidor Express, gerencia middleware e define rotas

import express from 'express';
import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import routeRoutes from './routes/routeRoutes.js';
import postoRoutes from './routes/postoRoutes.js';
import veichleRoutes from './routes/veichleRoutes.js';
import resumoRoutes from './routes/resumoRoutes.js';
import configUserRoutes from './routes/configUserRoutes.js';
import configMetricRoutes from './routes/configMetricRoutes.js';
import db from './config/db.js';

const app = express();

// Configuração de Cookies e Sessões
app.use(cookieParser());
app.use(
    session({
        secret: 'chave-secreta',
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false, 
            httpOnly: true,
            sameSite: 'lax',
        },
    })
);

// Configuração CORS
app.use(
    cors({
        origin: 'http://localhost:5173', // Altere para a origem correta do frontend
        credentials: true, // Permite o envio de cookies
    })
);

// Middleware para interpretar JSON
app.use(express.json());

// Teste de Conexão com o Banco de Dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err.message);
    process.exit(1); // Encerra o processo se não conectar
  } else {
    console.log('Conexão com o banco de dados estabelecida.');
  }
});

// Rotas
app.use('/api/users', userRoutes); // Rotas de usuários
app.use('/api/rotas', routeRoutes); // Rotas de rotas
app.use('/api/postos', postoRoutes); // Rotas de postos
app.use('/api/veichles', veichleRoutes); // Rotas de veículos
app.use('/api/resumos', resumoRoutes); // Rotas de resumos
app.use('/api/config', configUserRoutes); // Rotas de configuracoes de usuario
app.use('/api/config', configMetricRoutes); // Rotas de configuracoes de metricas

// Add this for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});