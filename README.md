# **SmartGas**  

O **SmartGas** é uma aplicação web desenvolvida para ajudar usuários a calcular e monitorar custos de consumo de combustível. A aplicação oferece ferramentas para gerenciamento de veículos, postos de combustíveis, rotas e geração de resumos de custos.  

---

## **Índice**  
- [Recursos](#recursos)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Estrutura do Projeto](#estrutura-do-projeto)  
- [Instalação](#instalação)  
- [Configuração](#configuração)  
- [Documentação da API](#documentação-da-api)  
- [Modelo de Banco de Dados](#modelo-de-banco-de-dados)  
- [Componentes](#componentes)  
- [Capturas de Tela](#capturas-de-tela)  

---

## **Recursos**  

### **Gerenciamento de Veículos**  
- Adicionar, editar e excluir veículos  
- Acompanhar consumo urbano e rodoviário  
- Suporte para vários tipos de veículos (carros, motos, caminhões etc.)  

### **Gerenciamento de Postos de Combustíveis**  
- Armazenar e gerenciar informações de postos  
- Monitorar preços de diferentes tipos de combustíveis (gasolina, etanol, diesel)  
- Comparar preços entre postos  

### **Gerenciamento de Rotas**  
- Criar e armazenar rotas frequentemente utilizadas  
- Calcular distâncias entre pontos  
- Estimar custos de combustível para viagens  

### **Análise de Custos**  
- Gerar resumos de custos  
- Visualizar dados históricos  
- Gráficos interativos para visualização de dados  
- Intervalos de datas personalizáveis (30 dias, 90 dias, 180 dias, 1 ano)  

### **Configurações de Usuário**  
- Personalizar unidades de medida  
- Preferências de moeda  
- Gerenciamento de senhas  

---

## **Tecnologias Utilizadas**  

### **Frontend**  
- React 18.3  
- Vite 6.0  
- Chart.js para visualização de dados  
- Bootstrap 5.3 para estilização  
- FontAwesome para ícones  
- Axios para requisições HTTP  

### **Backend**  
- Node.js  
- Express.js  
- MySQL 2  
- Express Session para autenticação  
- CORS para requisições cross-origin  
- Multer para upload de arquivos  

---

## **Instalação**  

1. Clone o repositório:  
```bash
git clone [repository-url]
```

2. Instale as dependências:  
```bash
npm install
```

3. Configure o banco de dados:  
- Crie um banco de dados MySQL  
- Importe o esquema do arquivo `smart-gas.sql`  
- Atualize as credenciais no arquivo `db.js`  

4. Inicie os servidores de desenvolvimento:  
```bash
npm run backend  
npm run dev  
```

---

## **Configuração**  
**Configuração do Banco de Dados**  
- Arquivo: `db.js`  

```javascript
{
  host: 'localhost',
  user: '[username]',
  password: '[password]',
  database: 'smartgas'
}
```

---

## **Documentação da API**  

### **Endpoints de Autenticação**  
- `POST /api/users/login` - Login de usuário  
- `POST /api/users/register` - Registro de usuário  
- `GET /api/users/logout` - Logout de usuário  

### **Endpoints de Veículos**  
- `GET /api/veichles` - Obter todos os veículos  
- `POST /api/veichles` - Criar novo veículo  
- `PUT /api/veichles/:id` - Atualizar veículo  
- `DELETE /api/veichles/:id` - Excluir veículo  

### **Endpoints de Postos de Combustíveis**  
- `GET /api/postos` - Obter todos os postos  
- `POST /api/postos` - Criar novo posto  
- `PUT /api/postos/:id` - Atualizar posto  
- `DELETE /api/postos/:id` - Excluir posto  

### **Endpoints de Rotas**  
- `GET /api/rotas` - Obter todas as rotas  
- `POST /api/rotas` - Criar nova rota  
- `PUT /api/rotas/:id` - Atualizar rota  
- `DELETE /api/rotas/:id` - Excluir rota  

### **Endpoints de Resumos de Custos**  
- `GET /api/resumos` - Obter resumos de custos  
- `POST /api/resumos` - Criar novo resumo  
- `PUT /api/resumos/:id` - Atualizar resumo  
- `DELETE /api/resumos/:id` - Excluir resumo  

---

## **Modelo de Banco de Dados**  
**Tabelas:**  
- `Usuario` - Informações dos usuários  
- `Veiculo` - Dados dos veículos  
- `Posto` - Informações dos postos de combustíveis  
- `Rota` - Detalhes das rotas  
- `Resumo` - Resumos de custos  
- `Configuracoes` - Configurações dos usuários  

---

## **Componentes**  

### **Componentes Principais**  
- `BlocoVeiculo` - Exibição e gerenciamento de veículos  
- `BlocoPosto` - Exibição e gerenciamento de postos  
- `BlocoRota` - Exibição e gerenciamento de rotas  
- `ModalAdicionarResumo` - Adicionar novos resumos de custos  
- `ModalEditarResumo` - Editar resumos existentes  

### **Componentes de Layout**  
- `Topbar` - Navegação e interface do usuário  
- `ProtectedRoute` - Middleware para proteção de rotas  

---

## **Capturas de Tela**

### 🖼️ Interface Inicial
![Interface Inicial](gitimages/Screenshot%20From%202025-02-12%2020-18-32.png)

### 📊 Página da calculadora
![Página da calculadora](gitimages/Screenshot%20From%202025-02-12%2020-19-20.png)

### 📈 Gráfico de Consumo
![Gráfico de Consumo](gitimages/Screenshot%20From%202025-02-12%2020-19-33.png)

### 🛻 Página "Sobre"
![Página Sobre](gitimages/Screenshot%20From%202025-02-12%2020-18-50.png)

---

## Corrigir

1. Ao digitar alguma informação errada na tela de login, nada acontece
2. hover no valor do combustivel (bloco posto) não fica com o cursor click, e no bloco rota também
3. Melhorar design dos modal de todos os modal do site, e adicionar função de fechar modal com a tecla “esc”.
4. Ao selecionar a função de calcular ida e volta, no modal do resultado deve explicitar que está sendo calculado o valor da ida e da volta.
5. Eu lembro que havia um erro ocorrendo ao mudar uma coisa nas configurações, mas não me lembro o que é.

## Responsivo

1. Principalmente corrigir o tamanho das imagens nos menus
2. Corrigir proporções no texto
3. Fazer responsivo das configurações
4. Fazer responsivo do cadastro e do login

## Adicionar

1. Adicionar animações na abertura e fechamento dos modal
2. Criar um modal de “usuario cadastrado com sucesso” ao cadastrar novo usuario

---

## **Contribuição**  
1. Faça um fork do repositório  
2. Crie uma branch para a feature  
3. Realize os commits das mudanças  
4. Envie para a branch  
5. Abra um Pull Request 
