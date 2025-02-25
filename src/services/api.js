// src/api.js
// Serviço para interagir com a API do backend

const BASE_URL = 'http://localhost:5000';

// Função para buscar rotas do backend
export const fetchRoutes = async () => {
    const response = await fetch(`${BASE_URL}/api/rotas`, {
        method: 'GET',
        credentials: 'include', // Inclui cookies na requisição
    });
    if (!response.ok) throw new Error('Erro ao buscar rotas'); // Lança um erro se a resposta não for bem-sucedida
    return response.json(); // Retorna os dados da resposta em formato JSON
};