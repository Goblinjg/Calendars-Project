import express from 'express';
import cors from 'cors';
import router from './router'; // Importa as rotas que definimos

const app = express();
const PORT = 3000;

// 1. Libera o acesso para o Frontend (React)
app.use(cors());

// 2. Permite ler JSON no corpo das requisições
app.use(express.json());

// 3. (MUITO IMPORTANTE) Diz ao servidor para usar as suas rotas
app.use(router);

// Rota de teste simples (para ver se o servidor responde)
app.get('/', (req, res) => {
  res.send('Backend Calendars está funcionando!');
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando na porta ${PORT}`);
});