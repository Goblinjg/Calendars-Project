import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001; // Porta padrão para a API

// Middlewares
app.use(cors()); // Permite requisições do frontend
app.use(express.json()); // Permite ao Express entender JSON

// Rota de teste
app.get('/', (req, res) => {
  res.send('API do Sistema de Gerenciamento Acadêmico está no ar!');
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`[backend]: 🚀 Servidor rodando em http://localhost:${port}`);
});