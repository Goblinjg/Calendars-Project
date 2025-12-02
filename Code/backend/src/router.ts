import { Router } from 'express';
import { UsuarioController } from './controller/UsuarioController';
import { AnotacaoController } from './controller/AnotacaoController';
import { MateriaController } from './controller/MateriaController';

const router = Router();

// Log de requisições
router.use((req, res, next) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

// Usuários
router.post('/cadastro', UsuarioController.cadastrarUsuario);
router.post('/login', UsuarioController.autenticar);

// Anotações
router.post('/anotacoes', AnotacaoController.criar);
router.get('/anotacoes', AnotacaoController.listar);
router.put('/anotacoes/:id', AnotacaoController.atualizar);
router.delete('/anotacoes/:id', AnotacaoController.excluir);

// --- NOVAS ROTAS: Matérias (RF011) ---
router.post('/materias', MateriaController.criar);
router.get('/materias', MateriaController.listar);

export default router;