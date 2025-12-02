import { Router } from 'express';
// Importação dos Controllers
import { UsuarioController } from './controller/UsuarioController';
import { AnotacaoController } from './controller/AnotacaoController';
import { MateriaController } from './controller/MateriaController';
import { DashboardController } from './controller/DashboardController';
import { TarefaController } from './controller/TarefaController'; // <--- Importe o novo Controller

const router = Router();

router.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// --- ROTAS DE USUÁRIO (RF001 e RF002) ---
router.post('/cadastro', UsuarioController.cadastrarUsuario);
router.post('/login', UsuarioController.autenticar);

// --- ROTAS DE ANOTAÇÕES (RF003 a RF006) ---
router.post('/anotacoes', AnotacaoController.criar);
router.get('/anotacoes', AnotacaoController.listar);
router.put('/anotacoes/:id', AnotacaoController.atualizar);
router.delete('/anotacoes/:id', AnotacaoController.excluir);

// --- ROTAS DE MATÉRIAS (RF011 e RF012) ---
router.post('/materias', MateriaController.criar);
router.get('/materias', MateriaController.listar);
router.delete('/materias/:id', MateriaController.excluir);

// --- ROTA DO DASHBOARD (RF013) ---
router.get('/dashboard/resumo', DashboardController.getResumo);

// --- ROTAS DE TAREFAS (RF007 a RF010) ---
// CRUD Completo com interação de 3 tabelas (Tarefas, Materias, Anotacoes)
router.post('/tarefas', TarefaController.criar);           // Cria vinculando a Matéria e Anotação
router.get('/tarefas', TarefaController.listar);           // Lista com JOINs
router.patch('/tarefas/:id/status', TarefaController.atualizarStatus); // Atualiza só o status
router.delete('/tarefas/:id', TarefaController.excluir);   // Exclui

export default router;