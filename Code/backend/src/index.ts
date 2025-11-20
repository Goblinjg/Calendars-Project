import express from 'express';
import cors from 'cors'; 
import { AnotacaoController } from './controller/AnotacaoController';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors()); 
app.post('/anotacoes', AnotacaoController.criar);
app.get('/anotacoes', AnotacaoController.listar);
app.put('/anotacoes/:id', AnotacaoController.atualizar);
app.delete('/anotacoes/:id', AnotacaoController.excluir);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});